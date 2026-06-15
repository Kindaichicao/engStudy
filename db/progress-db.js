/**
 * progress-db.js — SQLite data-access layer for the TechEnglish progress store.
 *
 * Uses better-sqlite3 (synchronous, fast, file-based).
 * The DB file lives at  data/progress.db  by default.
 */

const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const DEFAULT_DB_PATH = path.join(__dirname, "..", "data", "progress.db");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

function open(dbPath = process.env.PROGRESS_DB_PATH || DEFAULT_DB_PATH) {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const db = new Database(dbPath);
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf8"));
  return new ProgressDB(db);
}

class ProgressDB {
  constructor(db) {
    this.db = db;
    this._prep();
  }

  _prep() {
    const db = this.db;
    this.stmts = {
      upsertUser: db.prepare(`
        INSERT INTO users (user_id, last_seen_at)
        VALUES (?, datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET last_seen_at = datetime('now')
      `),
      getUser: db.prepare(`SELECT * FROM users WHERE user_id = ?`),

      upsertLesson: db.prepare(`
        INSERT INTO lesson_progress (user_id, lesson_id, status, started_at, completed_at, updated_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(user_id, lesson_id) DO UPDATE SET
          status       = excluded.status,
          started_at   = COALESCE(lesson_progress.started_at, excluded.started_at),
          completed_at = CASE
                           WHEN excluded.status = 'completed' THEN excluded.completed_at
                           ELSE lesson_progress.completed_at
                         END,
          updated_at   = datetime('now')
      `),
      allLessons: db.prepare(`SELECT * FROM lesson_progress WHERE user_id = ?`),
      deleteLesson: db.prepare(`DELETE FROM lesson_progress WHERE user_id = ? AND lesson_id = ?`),

      insertAttempt: db.prepare(`
        INSERT INTO scenario_attempts (user_id, lesson_id, scenario_id, score)
        VALUES (?, ?, ?, ?)
      `),
      bestScores: db.prepare(`
        SELECT lesson_id, scenario_id,
               MAX(score) AS best_score,
               COUNT(*)   AS attempts,
               MAX(created_at) AS last_at
        FROM scenario_attempts
        WHERE user_id = ?
        GROUP BY lesson_id, scenario_id
      `),

      insertChatLog: db.prepare(`
        INSERT INTO chat_logs (user_id, lesson_id, scenario_id, score, transcript_json)
        VALUES (?, ?, ?, ?, ?)
      `),
      recentChatLogs: db.prepare(`
        SELECT log_id, lesson_id, scenario_id, score, transcript_json, created_at
        FROM chat_logs
        WHERE user_id = ?
          AND (? IS NULL OR lesson_id = ?)
        ORDER BY created_at DESC
        LIMIT ?
      `),
      pruneChatLogs: db.prepare(`
        DELETE FROM chat_logs
        WHERE user_id = ?
          AND log_id NOT IN (
            SELECT log_id FROM chat_logs
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ?
          )
      `),

      getStreak: db.prepare(`SELECT * FROM streaks WHERE user_id = ?`),
      upsertStreak: db.prepare(`
        INSERT INTO streaks (user_id, last_study_date, current_count, longest_count, updated_at)
        VALUES (?, ?, ?, ?, datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET
          last_study_date = excluded.last_study_date,
          current_count   = excluded.current_count,
          longest_count   = excluded.longest_count,
          updated_at      = datetime('now')
      `),

      upsertSelfCheck: db.prepare(`
        INSERT INTO self_check (user_id, lesson_id, checks_json, updated_at)
        VALUES (?, ?, ?, datetime('now'))
        ON CONFLICT(user_id, lesson_id) DO UPDATE SET
          checks_json = excluded.checks_json,
          updated_at  = datetime('now')
      `),
      allSelfCheck: db.prepare(`SELECT lesson_id, checks_json FROM self_check WHERE user_id = ?`),

      deleteUser: db.prepare(`DELETE FROM users WHERE user_id = ?`)
    };
  }

  ensureUser(userId) {
    this.stmts.upsertUser.run(userId);
  }

  // --- Lesson progress ---------------------------------------------------
  setLessonStatus(userId, lessonId, status) {
    this.ensureUser(userId);
    const now = new Date().toISOString();
    const startedAt = status === "not_started" ? null : now;
    const completedAt = status === "completed" ? now : null;
    this.stmts.upsertLesson.run(userId, lessonId, status, startedAt, completedAt);
    this._bumpStreak(userId);
  }

  resetLesson(userId, lessonId) {
    this.stmts.deleteLesson.run(userId, lessonId);
  }

  // --- Scenario attempts -------------------------------------------------
  recordAttempt(userId, lessonId, scenarioId, score) {
    this.ensureUser(userId);
    this.stmts.insertAttempt.run(userId, lessonId, scenarioId, score);
    // Mark lesson as in_progress on first attempt
    const existing = this.db.prepare(
      `SELECT status FROM lesson_progress WHERE user_id = ? AND lesson_id = ?`
    ).get(userId, lessonId);
    if (!existing) {
      this.setLessonStatus(userId, lessonId, "in_progress");
    } else {
      this._bumpStreak(userId);
    }
  }

  // --- Chat logs (capped at 30 most recent per user) --------------------
  saveChatLog(userId, { lessonId, scenarioId, score, transcript }) {
    this.ensureUser(userId);
    this.stmts.insertChatLog.run(
      userId,
      lessonId || null,
      scenarioId || null,
      score == null ? null : Math.round(score),
      JSON.stringify(transcript || [])
    );
    this.stmts.pruneChatLogs.run(userId, userId, 30);
  }

  // --- Self-check --------------------------------------------------------
  setSelfCheck(userId, lessonId, checks) {
    this.ensureUser(userId);
    this.stmts.upsertSelfCheck.run(userId, lessonId, JSON.stringify(checks));
  }

  // --- Streak (computed) -------------------------------------------------
  _bumpStreak(userId) {
    const today = new Date().toISOString().slice(0, 10);
    const cur = this.stmts.getStreak.get(userId);
    if (cur && cur.last_study_date === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let count = 1;
    let longest = 1;
    if (cur) {
      count = (cur.last_study_date === yesterday) ? (cur.current_count + 1) : 1;
      longest = Math.max(cur.longest_count || 0, count);
    }
    this.stmts.upsertStreak.run(userId, today, count, longest);
  }

  // --- Bulk read for the front-end --------------------------------------
  getAll(userId) {
    this.ensureUser(userId);
    const lessons = this.stmts.allLessons.all(userId);
    const attempts = this.stmts.bestScores.all(userId);
    const streak = this.stmts.getStreak.get(userId) || { last_study_date: null, current_count: 0, longest_count: 0 };
    const selfCheck = this.stmts.allSelfCheck.all(userId);
    const chatLogs = this.stmts.recentChatLogs.all(userId, null, null, 30).map(r => ({
      logId: r.log_id,
      lessonId: r.lesson_id,
      scenarioId: r.scenario_id,
      score: r.score,
      transcript: safeJson(r.transcript_json),
      createdAt: r.created_at
    }));

    const lessonsMap = {};
    lessons.forEach(l => {
      lessonsMap[l.lesson_id] = {
        status: l.status,
        startedAt: l.started_at,
        completedAt: l.completed_at,
        scenarios: {}
      };
    });
    attempts.forEach(a => {
      if (!lessonsMap[a.lesson_id]) {
        lessonsMap[a.lesson_id] = { status: "in_progress", scenarios: {} };
      }
      lessonsMap[a.lesson_id].scenarios[a.scenario_id] = {
        bestScore: a.best_score,
        attempts: a.attempts,
        lastAt: a.last_at
      };
    });

    const selfCheckMap = {};
    selfCheck.forEach(s => { selfCheckMap[s.lesson_id] = safeJson(s.checks_json) || []; });

    return {
      lessons: lessonsMap,
      streak: {
        lastStudyDate: streak.last_study_date,
        count: streak.current_count,
        longest: streak.longest_count
      },
      selfCheck: selfCheckMap,
      chatLogs
    };
  }

  // --- Import from browser localStorage backup --------------------------
  importBackup(userId, data) {
    if (!data || typeof data !== "object") return { imported: 0 };
    const tx = this.db.transaction(() => {
      this.ensureUser(userId);
      let imported = 0;

      // lessons
      Object.entries(data.lessons || {}).forEach(([lessonId, l]) => {
        if (!l || !l.status) return;
        this.stmts.upsertLesson.run(
          userId, lessonId, l.status,
          l.startedAt || null,
          l.completedAt || null
        );
        imported++;
        // scenarios are best-effort: each becomes a single attempt at best_score
        Object.entries(l.scenarios || {}).forEach(([scId, s]) => {
          if (s && s.bestScore != null) {
            this.stmts.insertAttempt.run(userId, lessonId, scId, Math.round(s.bestScore));
            imported++;
          }
        });
      });

      // streak
      if (data.streak) {
        this.stmts.upsertStreak.run(
          userId,
          data.streak.lastStudyDate || null,
          data.streak.count || 0,
          data.streak.longest || 0
        );
      }

      // chat logs (last 30)
      (data.chatLogs || []).slice(0, 30).forEach(entry => {
        this.stmts.insertChatLog.run(
          userId,
          entry.lessonId || null,
          entry.scenarioId || null,
          entry.score == null ? null : Math.round(entry.score),
          JSON.stringify(entry.transcript || [])
        );
      });

      return imported;
    });
    return { imported: tx() };
  }

  reset(userId) {
    this.stmts.deleteUser.run(userId);
  }

  close() {
    try { this.db.close(); } catch {}
  }
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return null; }
}

module.exports = { open, ProgressDB };
