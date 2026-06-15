-- TechEnglish progress database schema (SQLite).
-- All tables are keyed by user_id so the same DB can serve many learners.
-- The browser stores its user_id in localStorage; copy it across devices to
-- continue the same study journey.

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  user_id      TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id      TEXT NOT NULL,
  lesson_id    TEXT NOT NULL,
  status       TEXT NOT NULL CHECK(status IN ('not_started','in_progress','completed')),
  started_at   TEXT,
  completed_at TEXT,
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON lesson_progress(user_id);

CREATE TABLE IF NOT EXISTS scenario_attempts (
  attempt_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL,
  lesson_id   TEXT NOT NULL,
  scenario_id TEXT NOT NULL,
  score       INTEGER NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_attempts_user_lesson
  ON scenario_attempts(user_id, lesson_id, scenario_id);

CREATE TABLE IF NOT EXISTS chat_logs (
  log_id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         TEXT NOT NULL,
  lesson_id       TEXT,
  scenario_id     TEXT,
  score           INTEGER,
  transcript_json TEXT NOT NULL,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chatlogs_user_date
  ON chat_logs(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS streaks (
  user_id          TEXT PRIMARY KEY,
  last_study_date  TEXT,
  current_count    INTEGER NOT NULL DEFAULT 0,
  longest_count    INTEGER NOT NULL DEFAULT 0,
  updated_at       TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS self_check (
  user_id     TEXT NOT NULL,
  lesson_id   TEXT NOT NULL,
  checks_json TEXT NOT NULL,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
