/**
 * TechEnglish server.
 *
 * - Serves the static site (HTML/CSS/JS) from the project root.
 * - Exposes /api/coach/health and /api/coach/chat so the AI coach can call
 *   Gemini or Groq without ever exposing the key to the browser.
 *
 * Configure with a `.env` file in the project root (see `.env.example`):
 *   PORT=8765
 *   COACH_PROVIDER=gemini | groq
 *   GEMINI_API_KEY=...
 *   GROQ_API_KEY=...
 *
 * Run:
 *   npm install
 *   npm start                # production
 *   npm run dev              # auto-restart on save
 *
 * Requires Node >= 18 (uses built-in fetch).
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const { open: openProgressDb } = require("./db/progress-db");

const PORT = Number(process.env.PORT) || 8765;
const DEFAULT_PROVIDER = (process.env.COACH_PROVIDER || "gemini").toLowerCase();
const GEMINI_KEY = (process.env.GEMINI_API_KEY || "").trim();
const GROQ_KEY = (process.env.GROQ_API_KEY || "").trim();
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const app = express();
app.use(express.json({ limit: "1mb" }));

// ---------------------------------------------------------------------------
// Progress database — single-user mode.
// Set USER_ID in .env to override the default ("me").
// ---------------------------------------------------------------------------
const progressDb = openProgressDb();
const USER_ID = (process.env.USER_ID || "me").trim();
console.log("Progress DB ready at", process.env.PROGRESS_DB_PATH || "data/progress.db", "| user:", USER_ID);

// ---------------------------------------------------------------------------
// API: health — tells the front-end which provider (if any) is configured.
// ---------------------------------------------------------------------------
app.get("/api/coach/health", (req, res) => {
  const providers = [];
  if (GEMINI_KEY) providers.push("gemini");
  if (GROQ_KEY) providers.push("groq");
  res.json({
    configured: providers.length > 0,
    providers,
    defaultProvider: providers.includes(DEFAULT_PROVIDER) ? DEFAULT_PROVIDER : (providers[0] || null),
    geminiModel: GEMINI_MODEL,
    groqModel: GROQ_MODEL
  });
});

// ---------------------------------------------------------------------------
// API: chat — proxy to the selected AI provider with the server-side key.
//
// Body: { provider?: "gemini"|"groq", messages: [{role, content}, ...] }
//   role: "system" | "user" | "assistant"
// Returns: { reply, provider }
// ---------------------------------------------------------------------------
app.post("/api/coach/chat", async (req, res) => {
  try {
    const body = req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }
    if (messages.length > 40) {
      return res.status(400).json({ error: "too many messages (max 40)" });
    }

    const reqProvider = (body.provider || DEFAULT_PROVIDER).toLowerCase();
    const provider = (reqProvider === "groq" && GROQ_KEY) ? "groq"
                   : (reqProvider === "gemini" && GEMINI_KEY) ? "gemini"
                   : (GEMINI_KEY ? "gemini" : (GROQ_KEY ? "groq" : null));

    if (!provider) {
      return res.status(503).json({
        error: "No AI provider key configured on the server. Set GEMINI_API_KEY or GROQ_API_KEY in .env."
      });
    }

    const reply = provider === "groq"
      ? await callGroq(messages)
      : await callGemini(messages);

    res.json({ reply, provider });
  } catch (err) {
    console.error("[coach/chat] error:", err.message);
    res.status(500).json({ error: err.message || "Coach request failed." });
  }
});

// ---------------------------------------------------------------------------
// Provider integrations
// ---------------------------------------------------------------------------
async function callGroq(messages) {
  // Groq uses the OpenAI-compatible Chat Completions schema.
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 240
    })
  });
  if (!r.ok) {
    const text = await safeText(r);
    throw new Error(`Groq ${r.status}: ${text.slice(0, 200)}`);
  }
  const j = await r.json();
  return (j.choices?.[0]?.message?.content || "").trim() || "(no response)";
}

async function callGemini(messages) {
  const system = messages.find(m => m.role === "system")?.content || "";
  const conv = messages.filter(m => m.role !== "system");
  const contents = conv.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "") }]
  }));
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
  const payload = {
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 240 }
  };
  if (system) payload.systemInstruction = { parts: [{ text: system }] };

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const text = await safeText(r);
    throw new Error(`Gemini ${r.status}: ${text.slice(0, 200)}`);
  }
  const j = await r.json();
  return (j.candidates?.[0]?.content?.parts?.[0]?.text || "").trim() || "(no response)";
}

async function safeText(r) {
  try { return await r.text(); } catch { return ""; }
}

// ---------------------------------------------------------------------------
// PROGRESS API — single-user mode (no auth, all data tied to USER_ID).
// All browsers connecting to the same server share the same progress.
// ---------------------------------------------------------------------------

app.get("/api/progress/health", (req, res) => res.json({ ok: true }));

app.get("/api/progress", (req, res) => {
  try {
    res.json(progressDb.getAll(USER_ID));
  } catch (err) {
    console.error("[progress] get:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/lesson", (req, res) => {
  const { lessonId, status } = req.body || {};
  if (!lessonId || !["not_started", "in_progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "lessonId + valid status required" });
  }
  try {
    progressDb.setLessonStatus(USER_ID, lessonId, status);
    res.json({ ok: true });
  } catch (err) {
    console.error("[progress] lesson:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/scenario", (req, res) => {
  const { lessonId, scenarioId, score } = req.body || {};
  if (!lessonId || !scenarioId || typeof score !== "number") {
    return res.status(400).json({ error: "lessonId, scenarioId, numeric score required" });
  }
  try {
    progressDb.recordAttempt(USER_ID, lessonId, scenarioId, Math.max(0, Math.min(100, Math.round(score))));
    res.json({ ok: true });
  } catch (err) {
    console.error("[progress] scenario:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/chat-log", (req, res) => {
  const { lessonId, scenarioId, score, transcript } = req.body || {};
  if (!Array.isArray(transcript)) {
    return res.status(400).json({ error: "transcript array required" });
  }
  try {
    progressDb.saveChatLog(USER_ID, { lessonId, scenarioId, score, transcript });
    res.json({ ok: true });
  } catch (err) {
    console.error("[progress] chat-log:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/self-check", (req, res) => {
  const { lessonId, checks } = req.body || {};
  if (!lessonId || !Array.isArray(checks)) {
    return res.status(400).json({ error: "lessonId + checks array required" });
  }
  try {
    progressDb.setSelfCheck(USER_ID, lessonId, checks.map(Boolean));
    res.json({ ok: true });
  } catch (err) {
    console.error("[progress] self-check:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/import", (req, res) => {
  try {
    const result = progressDb.importBackup(USER_ID, req.body || {});
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error("[progress] import:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress/reset", (req, res) => {
  try {
    progressDb.reset(USER_ID);
    res.json({ ok: true });
  } catch (err) {
    console.error("[progress] reset:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Static files (HTML/CSS/JS) — served from project root.
// Place this AFTER the API routes so /api/* is not shadowed.
// Block sensitive paths so they can't leak the env or server internals.
// ---------------------------------------------------------------------------
const DENY = [
  /^\/?\.env(\..*)?$/i,
  /^\/?package(-lock)?\.json$/i,
  /^\/?node_modules(\/|$)/i,
  /^\/?\.git(\/|$)/i,
  /^\/?\.idea(\/|$)/i,
  /^\/?server\.js$/i,
  /^\/?db(\/|$)/i,
  /^\/?data(\/|$)/i
];
app.use((req, res, next) => {
  if (DENY.some(rx => rx.test(req.path))) {
    return res.status(404).send("Not found");
  }
  next();
});

app.use(express.static(path.join(__dirname), {
  extensions: ["html"],
  index: "index.html",
  dotfiles: "deny",
  setHeaders(res, filepath) {
    if (filepath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
  }
}));

// 404 fallback
app.use((req, res) => res.status(404).send("Not found"));

// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  const providers = [];
  if (GEMINI_KEY) providers.push(`gemini (${GEMINI_MODEL})`);
  if (GROQ_KEY) providers.push(`groq (${GROQ_MODEL})`);
  console.log(`\nTechEnglish server running at http://localhost:${PORT}`);
  console.log(providers.length
    ? `AI coach configured: ${providers.join(", ")}  |  default: ${DEFAULT_PROVIDER}`
    : "AI coach: no key in .env — front-end will fall back to user-provided keys.");
  console.log("Press Ctrl+C to stop.\n");
});
