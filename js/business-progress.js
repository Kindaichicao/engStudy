/**
 * BusinessProgress — hybrid local + server progress store (single-user).
 *
 * Design:
 *   - localStorage is the canonical source for reads (instant, works offline).
 *   - When the Node server is reachable, every write is mirrored to the
 *     SQLite DB (fire-and-forget). On boot we pull the server snapshot and
 *     merge it in, so any browser pointing at the same server sees the
 *     same progress automatically.
 *   - If the server is offline, the page still works — falls back to
 *     localStorage-only.
 *
 * Storage key:
 *   business_progress       — full progress snapshot (lessons, streak, chat logs, self_check)
 */
const BusinessProgress = (function () {
  const STORAGE_KEY = "business_progress";
  const MAX_LOGS = 30;

  // ---------------------------------------------------------------------
  // Local store
  // ---------------------------------------------------------------------
  function _load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && typeof raw === "object") {
        raw.lessons = raw.lessons || {};
        raw.streak = raw.streak || { lastStudyDate: null, count: 0, longest: 0 };
        raw.chatLogs = raw.chatLogs || [];
        raw.selfCheck = raw.selfCheck || {};
        return raw;
      }
    } catch {}
    return { lessons: {}, streak: { lastStudyDate: null, count: 0, longest: 0 }, chatLogs: [], selfCheck: {} };
  }
  function _save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  function _today() { return new Date().toISOString().slice(0, 10); }

  function _bumpStreak(data) {
    const today = _today();
    if (data.streak.lastStudyDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    data.streak.count = (data.streak.lastStudyDate === yesterday) ? (data.streak.count + 1) : 1;
    data.streak.longest = Math.max(data.streak.longest || 0, data.streak.count);
    data.streak.lastStudyDate = today;
  }

  // ---------------------------------------------------------------------
  // Server sync (fire-and-forget)
  // ---------------------------------------------------------------------
  let serverAvailable = false;
  let serverChecked = false;
  const listeners = new Set();

  async function _api(path, opts = {}) {
    const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
    const r = await fetch(path, { ...opts, headers });
    if (!r.ok) {
      const t = await r.text().catch(() => "");
      throw new Error(`${r.status} ${t.slice(0, 100)}`);
    }
    return r.json();
  }

  function _post(path, body) {
    if (!serverAvailable) return Promise.resolve(null);
    return _api(path, { method: "POST", body: JSON.stringify(body) }).catch(err => {
      console.warn("[BusinessProgress] sync failed:", path, err.message);
    });
  }

  function _notify() {
    listeners.forEach(fn => { try { fn(); } catch {} });
  }

  async function init() {
    // Ping the progress health endpoint; it's cheap and tells us if a DB is ready.
    try {
      const r = await fetch("/api/progress/health", { cache: "no-store" });
      serverAvailable = r.ok;
    } catch {
      serverAvailable = false;
    }
    serverChecked = true;

    if (!serverAvailable) {
      _notify();
      return { synced: false, reason: "server-offline" };
    }

    try {
      // Push any progress the browser has but the DB doesn't, then pull the merged result.
      const local = _load();
      if (Object.keys(local.lessons).length || local.chatLogs.length) {
        await _api("/api/progress/import", { method: "POST", body: JSON.stringify(local) }).catch(() => {});
      }
      const server = await _api("/api/progress");
      const merged = _mergeServerIntoLocal(local, server);
      _save(merged);
      _notify();
      return { synced: true };
    } catch (err) {
      console.warn("[BusinessProgress] initial pull failed:", err.message);
      _notify();
      return { synced: false, reason: err.message };
    }
  }

  function _mergeServerIntoLocal(local, server) {
    const merged = {
      lessons: { ...local.lessons },
      streak: server.streak && server.streak.lastStudyDate ? server.streak : local.streak,
      chatLogs: local.chatLogs.slice(),
      selfCheck: { ...local.selfCheck, ...(server.selfCheck || {}) }
    };
    Object.entries(server.lessons || {}).forEach(([id, srv]) => {
      const loc = merged.lessons[id];
      if (!loc) { merged.lessons[id] = srv; return; }
      // Server wins on status if it's "more advanced".
      const rank = { not_started: 0, in_progress: 1, completed: 2 };
      const winner = rank[srv.status] >= rank[loc.status] ? srv : loc;
      const scenarios = { ...(loc.scenarios || {}) };
      Object.entries(srv.scenarios || {}).forEach(([sid, ss]) => {
        const ls = scenarios[sid];
        scenarios[sid] = {
          bestScore: Math.max(ls?.bestScore || 0, ss.bestScore || 0),
          attempts: Math.max(ls?.attempts || 0, ss.attempts || 0),
          lastAt: ss.lastAt || ls?.lastAt
        };
      });
      merged.lessons[id] = { ...winner, scenarios };
    });
    // Merge chatLogs by createdAt (server logs first since they're persistent), capped at MAX_LOGS.
    const seen = new Set(local.chatLogs.map(l => `${l.at || l.createdAt}-${l.lessonId}-${l.scenarioId}`));
    (server.chatLogs || []).forEach(l => {
      const k = `${l.createdAt}-${l.lessonId}-${l.scenarioId}`;
      if (!seen.has(k)) merged.chatLogs.push({
        lessonId: l.lessonId, scenarioId: l.scenarioId,
        score: l.score, transcript: l.transcript, at: l.createdAt
      });
    });
    merged.chatLogs.sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0));
    merged.chatLogs = merged.chatLogs.slice(0, MAX_LOGS);
    return merged;
  }

  // ---------------------------------------------------------------------
  // Public API (same shape as before, plus server sync side-effects)
  // ---------------------------------------------------------------------
  function getAll() { return _load(); }

  function getLesson(lessonId) {
    const data = _load();
    return data.lessons[lessonId] || { status: "not_started", scenarios: {} };
  }
  function getStatus(lessonId) { return getLesson(lessonId).status || "not_started"; }

  function markInProgress(lessonId) {
    const data = _load();
    const cur = data.lessons[lessonId] || {};
    if (cur.status === "completed") return;
    data.lessons[lessonId] = {
      ...cur,
      status: "in_progress",
      startedAt: cur.startedAt || new Date().toISOString(),
      scenarios: cur.scenarios || {}
    };
    _bumpStreak(data);
    _save(data);
    _post("/api/progress/lesson", { lessonId, status: "in_progress" });
  }

  function markCompleted(lessonId) {
    const data = _load();
    const cur = data.lessons[lessonId] || {};
    data.lessons[lessonId] = {
      ...cur,
      status: "completed",
      startedAt: cur.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      scenarios: cur.scenarios || {}
    };
    _bumpStreak(data);
    _save(data);
    _post("/api/progress/lesson", { lessonId, status: "completed" });
  }

  function reset(lessonId) {
    const data = _load();
    delete data.lessons[lessonId];
    _save(data);
    _post("/api/progress/lesson", { lessonId, status: "not_started" });
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    _post("/api/progress/reset", {});
  }

  function recordScenarioAttempt(lessonId, scenarioId, score) {
    const data = _load();
    const lesson = data.lessons[lessonId] || { status: "in_progress", scenarios: {} };
    if (lesson.status === "not_started") lesson.status = "in_progress";
    lesson.startedAt = lesson.startedAt || new Date().toISOString();
    const s = lesson.scenarios[scenarioId] || { attempts: 0, bestScore: 0 };
    s.attempts += 1;
    s.bestScore = Math.max(s.bestScore || 0, score || 0);
    s.lastAt = new Date().toISOString();
    lesson.scenarios[scenarioId] = s;
    data.lessons[lessonId] = lesson;
    _bumpStreak(data);
    _save(data);
    _post("/api/progress/scenario", { lessonId, scenarioId, score });
  }

  function pushChatLog(entry) {
    const data = _load();
    const at = entry.at || new Date().toISOString();
    data.chatLogs.unshift({ ...entry, at });
    data.chatLogs = data.chatLogs.slice(0, MAX_LOGS);
    _save(data);
    _post("/api/progress/chat-log", {
      lessonId: entry.lessonId,
      scenarioId: entry.scenarioId,
      score: entry.score,
      transcript: entry.transcript || []
    });
  }

  function getChatLogs(lessonId) {
    const data = _load();
    return lessonId ? data.chatLogs.filter(l => l.lessonId === lessonId) : data.chatLogs;
  }

  function setSelfCheck(lessonId, checks) {
    const data = _load();
    data.selfCheck[lessonId] = (checks || []).map(Boolean);
    _save(data);
    _post("/api/progress/self-check", { lessonId, checks: data.selfCheck[lessonId] });
  }
  function getSelfCheck(lessonId) {
    return (_load().selfCheck || {})[lessonId] || [];
  }

  function getStreak() { return _load().streak; }

  function getStats() {
    const data = _load();
    const total = (typeof BUSINESS_LESSONS_INDEX !== "undefined") ? BUSINESS_LESSONS_INDEX.length : 24;
    let completed = 0, inProgress = 0;
    Object.values(data.lessons).forEach(l => {
      if (l.status === "completed") completed++;
      else if (l.status === "in_progress") inProgress++;
    });
    return {
      total, completed, inProgress,
      notStarted: total - completed - inProgress,
      percent: Math.round((completed / total) * 100)
    };
  }

  function getServerStatus() {
    return { available: serverAvailable, checked: serverChecked };
  }

  function onSync(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  // Kick off background sync immediately.
  if (typeof window !== "undefined") {
    init().catch(() => {});
  }

  return {
    init, onSync, getServerStatus,
    getAll, getLesson, getStatus,
    markInProgress, markCompleted, reset, resetAll,
    recordScenarioAttempt, pushChatLog, getChatLogs,
    setSelfCheck, getSelfCheck,
    getStreak, getStats
  };
})();
