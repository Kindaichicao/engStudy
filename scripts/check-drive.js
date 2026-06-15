/**
 * scripts/check-drive.js — verify your Google Drive Service Account setup.
 *
 * Note: Service Accounts don't have their own storage quota on personal
 * Drive accounts, so they CANNOT create new files there. They CAN read and
 * update files that already exist in shared folders. So this check:
 *   1. Verifies SA auth
 *   2. Lists the folder contents
 *   3. Looks for the progress file (default: progress.json)
 *      - If missing: prints instructions to upload an empty {} file once
 *      - If present: downloads it and tests an in-place PATCH update
 *
 * Run:
 *   npm run check:drive
 */

require("dotenv").config();
const fs = require("fs");
const { DriveStore } = require("../db/drive-store");

const FILE_NAME = process.env.GOOGLE_DRIVE_FILE_NAME || "progress.json";

function loadSA() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64) {
    return JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64, "base64").toString("utf8"));
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE) {
    return JSON.parse(fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE, "utf8"));
  }
  console.error("❌ Set GOOGLE_SERVICE_ACCOUNT_KEY_B64 or GOOGLE_SERVICE_ACCOUNT_KEY_FILE in .env");
  process.exit(1);
}

(async () => {
  const sa = loadSA();
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
  if (!folderId) { console.error("❌ Set GOOGLE_DRIVE_FOLDER_ID in .env"); process.exit(1); }

  console.log("Service account:", sa.client_email);
  console.log("Folder ID:      ", folderId);
  console.log("File name:      ", FILE_NAME);
  console.log("");

  const store = new DriveStore({ sa, folderId, fileName: FILE_NAME });

  // 1. Auth
  try {
    const tok = await store._accessToken();
    console.log("✅ Auth OK (token length:", tok.length, ")");
  } catch (e) {
    console.error("❌ Auth FAILED:", e.message);
    console.error("   → check that the SA JSON is valid and the Drive API is enabled in the GCP project.");
    process.exit(1);
  }

  // 2. Folder accessible?
  let fileId;
  try {
    fileId = await store._findFile();
    console.log("✅ Folder accessible");
  } catch (e) {
    console.error("❌ Cannot list folder:", e.message);
    console.error("   → make sure you've shared the Drive folder with", sa.client_email, "as Editor.");
    process.exit(1);
  }

  // 3. Does the progress file exist?
  if (!fileId) {
    console.log("");
    console.log("⚠️  No `" + FILE_NAME + "` found in that folder yet.");
    console.log("");
    console.log("Service Accounts can't create files on personal Google Drive (no storage quota).");
    console.log("One-time fix — upload an empty placeholder so the SA can update it:");
    console.log("");
    console.log("   1. echo '{}' > /tmp/" + FILE_NAME);
    console.log("   2. Open https://drive.google.com → your shared folder");
    console.log("   3. + New → File upload → /tmp/" + FILE_NAME);
    console.log("   4. Re-run:  npm run check:drive");
    console.log("");
    process.exit(2);
  }
  console.log("✅ Found file (id:", fileId, ")");
  store.fileId = fileId;

  // 4. Download
  let original;
  try {
    original = await store._download(fileId);
    console.log("✅ Download OK (" + Buffer.byteLength(original, "utf8") + " bytes)");
  } catch (e) {
    console.error("❌ Download failed:", e.message);
    process.exit(1);
  }

  // 5. Round-trip a PATCH update (re-upload identical content + a probe key, then restore).
  try {
    const probe = JSON.stringify({ ...safeJson(original), _checkAt: new Date().toISOString() });
    await store._upload(probe);
    console.log("✅ Update (PATCH) OK");
    // Restore original content so we don't pollute the user's file.
    await store._upload(original || "{}");
    console.log("✅ Restored original content");
  } catch (e) {
    console.error("❌ Update failed:", e.message);
    if (/storage quota/i.test(e.message)) {
      console.error("   → file ownership might still belong to the SA. Delete and re-upload as your account.");
    }
    process.exit(1);
  }

  console.log("\n🎉 All checks passed. You can now run:  STORAGE_BACKEND=drive npm start");
})();

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
