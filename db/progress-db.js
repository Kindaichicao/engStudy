/**
 * progress-db.js — progress store factory.
 *
 * Two backends with the SAME public API:
 *   - JsonStore   → writes to a local JSON file       (default, STORAGE_BACKEND=local)
 *   - DriveStore  → writes to a JSON file in Google Drive (STORAGE_BACKEND=drive)
 *
 * Both extend `MemoryStore` (db/memory-store.js) which holds the in-memory
 * state and the mutation methods. Each backend overrides `_save()` to decide
 * where the persistence goes.
 *
 * `open()` is async because the Drive backend needs to download the file
 * before the server can start handling requests.
 */

const fs = require("fs");
const path = require("path");
const { MemoryStore } = require("./memory-store");
const { DriveStore } = require("./drive-store");

const DEFAULT_PATH = path.join(__dirname, "..", "data", "progress.json");

class JsonStore extends MemoryStore {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.state = this._load();
  }

  _load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
        return { ...MemoryStore.empty(), ...raw };
      }
    } catch (e) {
      console.warn("[progress] failed to load JSON, starting fresh:", e.message);
    }
    return MemoryStore.empty();
  }

  _save() {
    const tmp = this.filePath + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(this.state, null, 2));
    fs.renameSync(tmp, this.filePath);
  }
}

async function open() {
  const backend = (process.env.STORAGE_BACKEND || "local").toLowerCase();

  if (backend === "drive") {
    const sa = loadServiceAccount();
    const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
    if (!folderId) throw new Error("GOOGLE_DRIVE_FOLDER_ID is required for STORAGE_BACKEND=drive");
    const fileName = process.env.GOOGLE_DRIVE_FILE_NAME || "progress.json";
    const store = new DriveStore({ sa, folderId, fileName });
    await store.load();
    console.log(`[progress] Drive backend ready: folder=${folderId} file=${fileName}`);
    return store;
  }

  let filePath = process.env.PROGRESS_DB_PATH || DEFAULT_PATH;
  if (filePath.endsWith(".db")) filePath = filePath.replace(/\.db$/, ".json");
  const store = new JsonStore(filePath);
  console.log(`[progress] Local file backend ready: ${filePath}`);
  return store;
}

function loadServiceAccount() {
  const b64 = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64 || "").trim();
  if (b64) {
    try { return JSON.parse(Buffer.from(b64, "base64").toString("utf8")); }
    catch (e) { throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_B64 is not valid base64-encoded JSON: " + e.message); }
  }
  const file = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || "").trim();
  if (file) {
    try { return JSON.parse(fs.readFileSync(file, "utf8")); }
    catch (e) { throw new Error(`Failed to read GOOGLE_SERVICE_ACCOUNT_KEY_FILE (${file}): ${e.message}`); }
  }
  throw new Error("Set GOOGLE_SERVICE_ACCOUNT_KEY_B64 or GOOGLE_SERVICE_ACCOUNT_KEY_FILE for STORAGE_BACKEND=drive");
}

module.exports = { open, JsonStore, MemoryStore };
