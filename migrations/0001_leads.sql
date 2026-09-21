CREATE TABLE IF NOT EXISTS leads (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  phone     TEXT,
  email     TEXT,
  message   TEXT,
  campaign  TEXT,
  source    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
