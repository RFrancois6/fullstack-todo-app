const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'app.db'), {
  verbose: console.log
});

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    email     TEXT    NOT NULL UNIQUE,
    password  TEXT    NOT NULL               -- stockera le hash bcrypt
  );

  CREATE TABLE IF NOT EXISTS todos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id   INTEGER NOT NULL,
    title     TEXT    NOT NULL,
    done      INTEGER NOT NULL DEFAULT 0,    -- SQLite n'a pas de BOOLEAN : 0 = false, 1 = true
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;