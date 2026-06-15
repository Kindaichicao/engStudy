/**
 * memory-store.js — in-memory base class with all the business rules.
 * Backends (JsonStore, DriveStore) extend this and override `_save()`.
 */

const MAX_LOGS = 30;
const STATUS_RANK = { not_started: 0, in_progress: 1, completed: 2 };

class MemoryStore {
  constructor() {
    this.state = MemoryStore.empty();
  }

  static empty() {
    return {
      lessons: {},
      streak: { lastStudyDate: null, count: 0, longest: 0 },
      selfCheck: {},
      chatLogs: []
    };
  }

  // Override in subclasses to persist `this.state`.
  _save() { /* no-op */ }
  async flush() { /* override if backend buffers writes */ }
  close() { /* no-op */ }

  _bumpStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.state.streak.lastStudyDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    this.state.streak.count = (this.state.streak.lastStudyDate === yesterday)
      ? (this.state.streak.count + 1)
      : 1;
    this.state.streak.longest = Math.max(this.state.streak.longest || 0, this.state.streak.count);
    this.state.streak.lastStudyDate = today;
  }

  setLessonStatus(_userId, lessonId, status) {
    if (!STATUS_RANK.hasOwnProperty(status)) throw new Error(`bad status: ${status}`);
    const now = new Date().toISOString();
    const cur = this.state.lessons[lessonId] || { scenarios: {} };
    cur.status = status;
    if (status !== "not_started") cur.startedAt = cur.startedAt || now;
    if (status === "completed") cur.completedAt = now;
    this.state.lessons[lessonId] = cur;
    this._bumpStreak();
    this._save();
  }

  resetLesson(_userId, lessonId) {
    delete this.state.lessons[lessonId];
    this._save();
  }

  recordAttempt(_userId, lessonId, scenarioId, score) {
    const lesson = this.state.lessons[lessonId] || { status: "in_progress", scenarios: {} };
    if (!lesson.status || lesson.status === "not_started") lesson.status = "in_progress";
    lesson.startedAt = lesson.startedAt || new Date().toISOString();
    const sc = lesson.scenarios[scenarioId] || { attempts: 0, bestScore: 0 };
    sc.attempts = (sc.attempts || 0) + 1;
    sc.bestScore = Math.max(sc.bestScore || 0, Math.round(score) || 0);
    sc.lastAt = new Date().toISOString();
    lesson.scenarios[scenarioId] = sc;
    this.state.lessons[lessonId] = lesson;
    this._bumpStreak();
    this._save();
  }

  saveChatLog(_userId, { lessonId, scenarioId, score, transcript }) {
    this.state.chatLogs.unshift({
      lessonId: lessonId || null,
      scenarioId: scenarioId || null,
      score: score == null ? null : Math.round(score),
      transcript: transcript || [],
      createdAt: new Date().toISOString()
    });
    this.state.chatLogs = this.state.chatLogs.slice(0, MAX_LOGS);
    this._save();
  }

  setSelfCheck(_userId, lessonId, checks) {
    this.state.selfCheck[lessonId] = (checks || []).map(Boolean);
    this._save();
  }

  getAll(_userId) {
    return JSON.parse(JSON.stringify(this.state));
  }

  importBackup(_userId, data) {
    if (!data || typeof data !== "object") return { imported: 0 };
    let imported = 0;

    Object.entries(data.lessons || {}).forEach(([id, l]) => {
      if (!l || !l.status) return;
      const cur = this.state.lessons[id] || { scenarios: {} };
      if ((STATUS_RANK[l.status] || 0) >= (STATUS_RANK[cur.status] || 0)) {
        cur.status = l.status;
        cur.startedAt = cur.startedAt || l.startedAt || null;
        if (l.status === "completed") cur.completedAt = l.completedAt || cur.completedAt || new Date().toISOString();
      }
      Object.entries(l.scenarios || {}).forEach(([sid, s]) => {
        const ex = cur.scenarios[sid] || { attempts: 0, bestScore: 0 };
        ex.bestScore = Math.max(ex.bestScore || 0, s.bestScore || 0);
        ex.attempts = (ex.attempts || 0) + (s.attempts || 0);
        ex.lastAt = s.lastAt || ex.lastAt;
        cur.scenarios[sid] = ex;
      });
      this.state.lessons[id] = cur;
      imported++;
    });

    if (data.streak) {
      this.state.streak.count = Math.max(this.state.streak.count || 0, data.streak.count || 0);
      this.state.streak.longest = Math.max(this.state.streak.longest || 0, data.streak.longest || 0);
      this.state.streak.lastStudyDate = data.streak.lastStudyDate || this.state.streak.lastStudyDate;
    }

    const seen = new Set(this.state.chatLogs.map(l => `${l.createdAt}|${l.lessonId}|${l.scenarioId}`));
    (data.chatLogs || []).forEach(log => {
      const createdAt = log.at || log.createdAt || new Date().toISOString();
      const key = `${createdAt}|${log.lessonId || null}|${log.scenarioId || null}`;
      if (seen.has(key)) return;
      seen.add(key);
      this.state.chatLogs.push({
        lessonId: log.lessonId || null,
        scenarioId: log.scenarioId || null,
        score: log.score == null ? null : Math.round(log.score),
        transcript: log.transcript || [],
        createdAt
      });
    });
    this.state.chatLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    this.state.chatLogs = this.state.chatLogs.slice(0, MAX_LOGS);

    Object.entries(data.selfCheck || {}).forEach(([id, checks]) => {
      if (Array.isArray(checks)) this.state.selfCheck[id] = checks.map(Boolean);
    });

    this._save();
    return { imported };
  }

  reset(_userId) {
    this.state = MemoryStore.empty();
    this._save();
  }
}

module.exports = { MemoryStore, MAX_LOGS, STATUS_RANK };
