import "server-only";
import path from "path";
import fs from "fs";
import { DatabaseSync } from "node:sqlite";
import { seedEvents } from "@/data/seed";

// SQLite database stored in DATA_DIR (mount a persistent volume there on Coolify).

export const dataDir = () => path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
export const uploadsDir = () => path.join(dataDir(), "uploads");

const g = globalThis as unknown as { __pr1db?: DatabaseSync };

export function db(): DatabaseSync {
  if (g.__pr1db) return g.__pr1db;
  fs.mkdirSync(uploadsDir(), { recursive: true });
  const d = new DatabaseSync(path.join(dataDir(), "pr-one.sqlite"));
  d.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  migrate(d);
  g.__pr1db = d;
  return d;
}

function migrate(d: DatabaseSync) {
  d.exec(`
    CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL DEFAULT 'SEMINAR',
      mode TEXT NOT NULL DEFAULT 'IN_PERSON',
      status TEXT NOT NULL DEFAULT 'draft',
      featured INTEGER NOT NULL DEFAULT 0,
      client TEXT NOT NULL DEFAULT '',
      starts_at TEXT,
      ends_at TEXT,
      year INTEGER,
      cover TEXT NOT NULL DEFAULT '',
      registration_open INTEGER NOT NULL DEFAULT 0,
      capacity INTEGER,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
    CREATE TABLE IF NOT EXISTS event_i18n (
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      locale TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      venue TEXT NOT NULL DEFAULT '',
      audience TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      PRIMARY KEY (event_id, locale)
    );
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '', company TEXT NOT NULL DEFAULT '', job_title TEXT NOT NULL DEFAULT '',
      locale TEXT NOT NULL DEFAULT 'en', consent INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      UNIQUE (event_id, email)
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, company TEXT NOT NULL DEFAULT '', email TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '',
      event_type TEXT NOT NULL DEFAULT '', event_date TEXT NOT NULL DEFAULT '', audience TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '', locale TEXT NOT NULL DEFAULT 'en', handled INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE, locale TEXT NOT NULL DEFAULT 'en',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
  `);

  const seeded = d.prepare("SELECT value FROM meta WHERE key = 'seeded'").get();
  if (!seeded) {
    const insertEvent = d.prepare(
      `INSERT INTO events (slug, type, mode, status, client, starts_at, year, cover, sort)
       VALUES (?, ?, 'IN_PERSON', 'published', ?, ?, ?, ?, ?)`
    );
    const insertText = d.prepare(`INSERT INTO event_i18n (event_id, locale, title) VALUES (?, 'en', ?)`);
    d.exec("BEGIN");
    try {
      seedEvents.forEach((e, i) => {
        const r = insertEvent.run(e.slug, e.type, e.client, e.startsAt ?? null, e.year, e.cover, i);
        insertText.run(Number(r.lastInsertRowid), e.title);
      });
      d.prepare("INSERT INTO meta (key, value) VALUES ('seeded', ?)").run(new Date().toISOString());
      d.exec("COMMIT");
    } catch (err) {
      d.exec("ROLLBACK");
      throw err;
    }
  }
}
