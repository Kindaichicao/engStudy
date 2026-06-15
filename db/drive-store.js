/**
 * drive-store.js — Google Drive backend for the progress JSON file.
 *
 * - Authenticates with a Service Account (JWT → access token).
 * - Stores a single JSON file in a Drive folder you've shared with the SA.
 * - Reads on boot, debounces writes (default 2s) to avoid hammering the API.
 *
 * Required env (handled by progress-db.js factory):
 *   GOOGLE_SERVICE_ACCOUNT_KEY_B64  (or _FILE)  — SA credentials
 *   GOOGLE_DRIVE_FOLDER_ID                       — target folder ID
 *   GOOGLE_DRIVE_FILE_NAME                       — optional, default "progress.json"
 *   DRIVE_DEBOUNCE_MS                            — optional, default 2000
 */

const crypto = require("crypto");
const { MemoryStore } = require("./memory-store");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3";
// `drive.file` only sees files the app created or the user explicitly picked.
// For our case (folder shared with SA), we need the full Drive scope.
const SCOPE = "https://www.googleapis.com/auth/drive";
const DEBOUNCE_MS = Number(process.env.DRIVE_DEBOUNCE_MS) || 2000;

class DriveStore extends MemoryStore {
  constructor({ sa, folderId, fileName = "progress.json" }) {
    super();
    this.sa = sa;
    this.folderId = folderId;
    this.fileName = fileName;

    this.fileId = null;
    this._token = null;
    this._tokenExp = 0;
    this._writeTimer = null;
    this._inFlight = false;
    this._needsRewrite = false;
    this._failures = 0;
  }

  // ---------- auth ----------
  async _accessToken() {
    if (this._token && Date.now() < this._tokenExp - 60_000) return this._token;
    const now = Math.floor(Date.now() / 1000);
    const enc = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
    const data = `${enc({ alg: "RS256", typ: "JWT" })}.${enc({
      iss: this.sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now
    })}`;
    const sig = crypto.sign("RSA-SHA256", Buffer.from(data), this.sa.private_key).toString("base64url");
    const jwt = `${data}.${sig}`;
    const r = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      })
    });
    if (!r.ok) throw new Error(`google auth ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    this._token = j.access_token;
    this._tokenExp = Date.now() + (j.expires_in || 3600) * 1000;
    return this._token;
  }

  // ---------- drive REST helpers ----------
  async _findFile() {
    const tok = await this._accessToken();
    const q = `name = '${this.fileName.replace(/'/g, "\\'")}' and '${this.folderId}' in parents and trashed = false`;
    const url = `${DRIVE_API}/files?q=${encodeURIComponent(q)}&fields=files(id,name)&spaces=drive`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
    if (!r.ok) throw new Error(`drive list ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    return j.files?.[0]?.id || null;
  }

  async _download(fileId) {
    const tok = await this._accessToken();
    const r = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${tok}` }
    });
    if (!r.ok) throw new Error(`drive download ${r.status}: ${(await r.text()).slice(0, 200)}`);
    return await r.text();
  }

  async _upload(content) {
    const tok = await this._accessToken();
    if (this.fileId) {
      const r = await fetch(`${DRIVE_UPLOAD}/files/${this.fileId}?uploadType=media`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
        body: content
      });
      if (!r.ok) throw new Error(`drive update ${r.status}: ${(await r.text()).slice(0, 200)}`);
      return;
    }
    // First write — create the file inside the shared folder.
    const boundary = "----techenglish-" + crypto.randomBytes(8).toString("hex");
    const meta = JSON.stringify({
      name: this.fileName,
      parents: [this.folderId],
      mimeType: "application/json"
    });
    const body =
      `--${boundary}\r\n` +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      meta + "\r\n" +
      `--${boundary}\r\n` +
      "Content-Type: application/json\r\n\r\n" +
      content + "\r\n" +
      `--${boundary}--`;
    const r = await fetch(`${DRIVE_UPLOAD}/files?uploadType=multipart&fields=id`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tok}`,
        "Content-Type": `multipart/related; boundary=${boundary}`
      },
      body
    });
    if (!r.ok) throw new Error(`drive create ${r.status}: ${(await r.text()).slice(0, 200)}`);
    this.fileId = (await r.json()).id;
  }

  // ---------- lifecycle ----------
  async load() {
    this.fileId = await this._findFile();
    if (this.fileId) {
      try {
        const text = await this._download(this.fileId);
        const parsed = JSON.parse(text);
        this.state = { ...MemoryStore.empty(), ...parsed };
      } catch (e) {
        console.warn("[drive] download failed, starting from empty state:", e.message);
      }
    }
  }

  async flush() {
    if (this._writeTimer) {
      clearTimeout(this._writeTimer);
      this._writeTimer = null;
    }
    while (this._inFlight) await new Promise(r => setTimeout(r, 100));
    await this._doUpload();
  }

  // ---------- override _save (debounced) ----------
  _save() {
    if (this._writeTimer) clearTimeout(this._writeTimer);
    this._writeTimer = setTimeout(() => this._doUpload(), DEBOUNCE_MS);
  }

  async _doUpload() {
    this._writeTimer = null;
    if (this._inFlight) {
      this._needsRewrite = true;
      return;
    }
    this._inFlight = true;
    const snapshot = JSON.stringify(this.state, null, 2);
    try {
      await this._upload(snapshot);
      this._failures = 0;
    } catch (e) {
      this._failures++;
      console.error(`[drive] save failed (#${this._failures}):`, e.message);
      const delay = Math.min(30_000, 2000 * Math.pow(2, this._failures));
      this._writeTimer = setTimeout(() => this._doUpload(), delay);
    } finally {
      this._inFlight = false;
      if (this._needsRewrite) {
        this._needsRewrite = false;
        this._save();
      }
    }
  }
}

module.exports = { DriveStore };
