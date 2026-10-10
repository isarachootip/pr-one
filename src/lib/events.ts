import "server-only";
import { db } from "./db";
import { locales, type Locale } from "@/i18n/config";

export const EVENT_TYPES = ["SEMINAR", "SUMMIT", "CONFERENCE", "ROADSHOW", "EXHIBITION", "LAUNCH", "KICK_OFF", "CUSTOMER_EVENT", "PR", "OTHER"] as const;
export const EVENT_MODES = ["IN_PERSON", "HYBRID", "VIRTUAL"] as const;

export type EventText = { title: string; summary: string; venue: string; audience: string; body: string };

export type EventRow = {
  id: number;
  slug: string;
  type: string;
  mode: string;
  status: "draft" | "published";
  featured: number;
  client: string;
  starts_at: string | null;
  ends_at: string | null;
  year: number | null;
  cover: string;
  registration_open: number;
  capacity: number | null;
  sort: number;
  created_at: string;
  updated_at: string;
};

export type EventFull = EventRow & { texts: Partial<Record<Locale, EventText>> };

/** Event as shown to visitors in one language (falls back to English, then any language). */
export type PublicEvent = {
  id: number;
  slug: string;
  type: string;
  mode: string;
  client: string;
  startsAt: string | null;
  endsAt: string | null;
  year: number | null;
  cover: string;
  registrationOpen: boolean;
  isUpcoming: boolean;
  isFull: boolean;
} & EventText;

const DAY = 86400000;

export function isUpcoming(e: Pick<EventRow, "starts_at" | "ends_at" | "registration_open">, now = Date.now()) {
  const end = e.ends_at || e.starts_at;
  if (end) return new Date(end).getTime() + DAY / 4 >= now;
  return e.registration_open === 1; // date to be confirmed but open for sign-up
}

function textsFor(ids: number[]) {
  const map = new Map<number, Partial<Record<Locale, EventText>>>();
  if (!ids.length) return map;
  const rows = db()
    .prepare(`SELECT * FROM event_i18n WHERE event_id IN (${ids.map(() => "?").join(",")})`)
    .all(...ids) as unknown as (EventText & { event_id: number; locale: Locale })[];
  for (const r of rows) {
    const m = map.get(r.event_id) ?? {};
    m[r.locale] = { title: r.title, summary: r.summary, venue: r.venue, audience: r.audience, body: r.body };
    map.set(r.event_id, m);
  }
  return map;
}

function pickText(texts: Partial<Record<Locale, EventText>>, locale: Locale): EventText {
  const empty: EventText = { title: "", summary: "", venue: "", audience: "", body: "" };
  const en = texts.en ?? empty;
  const own = texts[locale] ?? empty;
  const any = Object.values(texts)[0] ?? empty;
  const out = { ...empty };
  (Object.keys(empty) as (keyof EventText)[]).forEach((k) => {
    out[k] = own[k] || en[k] || any[k] || "";
  });
  return out;
}

const countFor = (id: number) =>
  (db().prepare("SELECT COUNT(*) AS n FROM registrations WHERE event_id = ?").get(id) as { n: number }).n;

function toPublic(e: EventRow, texts: Partial<Record<Locale, EventText>>, locale: Locale): PublicEvent {
  const isFull = e.capacity != null && e.capacity > 0 && countFor(e.id) >= e.capacity;
  return {
    id: e.id,
    slug: e.slug,
    type: e.type,
    mode: e.mode,
    client: e.client,
    startsAt: e.starts_at,
    endsAt: e.ends_at,
    year: e.year ?? (e.starts_at ? new Date(e.starts_at).getUTCFullYear() : null),
    cover: e.cover,
    registrationOpen: e.registration_open === 1,
    isUpcoming: isUpcoming(e),
    isFull,
    ...pickText(texts, locale),
  };
}

const ORDER = "ORDER BY COALESCE(year, CAST(strftime('%Y', starts_at) AS INTEGER)) DESC, starts_at DESC, sort ASC, id DESC";

/** All published events in one language, split into upcoming (soonest first) and past (newest first). */
export function getPublishedEvents(locale: Locale) {
  const rows = db().prepare(`SELECT * FROM events WHERE status = 'published' ${ORDER}`).all() as unknown as EventRow[];
  const texts = textsFor(rows.map((r) => r.id));
  const all = rows.map((r) => ({ row: r, pub: toPublic(r, texts.get(r.id) ?? {}, locale) }));
  const upcoming = all
    .filter((x) => x.pub.isUpcoming)
    .sort((a, b) => (a.row.starts_at ?? "9999").localeCompare(b.row.starts_at ?? "9999"));
  const past = all.filter((x) => !x.pub.isUpcoming);
  const featuredRow =
    all.find((x) => x.row.featured === 1 && x.pub.isUpcoming) ?? upcoming[0] ?? all.find((x) => x.row.featured === 1) ?? past[0];
  return {
    upcoming: upcoming.map((x) => x.pub),
    past: past.map((x) => x.pub),
    featured: featuredRow?.pub ?? null,
  };
}

export function getPublishedEvent(slug: string, locale: Locale): PublicEvent | null {
  const row = db().prepare("SELECT * FROM events WHERE slug = ? AND status = 'published'").get(slug) as unknown as EventRow | undefined;
  if (!row) return null;
  return toPublic(row, textsFor([row.id]).get(row.id) ?? {}, locale);
}

// ---------- admin ----------

export function listEventsAdmin() {
  const rows = db()
    .prepare(
      `SELECT e.*, (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS registrations,
              (SELECT title FROM event_i18n t WHERE t.event_id = e.id AND t.locale = 'en') AS title_en,
              (SELECT title FROM event_i18n t WHERE t.event_id = e.id AND t.locale = 'th') AS title_th
       FROM events e ${ORDER}`
    )
    .all() as unknown as (EventRow & { registrations: number; title_en: string | null; title_th: string | null })[];
  return rows.map((r) => ({ ...r, upcoming: isUpcoming(r) }));
}

export function getEventAdmin(id: number): EventFull | null {
  const row = db().prepare("SELECT * FROM events WHERE id = ?").get(id) as unknown as EventRow | undefined;
  if (!row) return null;
  return { ...row, texts: textsFor([id]).get(id) ?? {} };
}

export type EventInput = Omit<EventRow, "id" | "created_at" | "updated_at"> & { texts: Partial<Record<Locale, EventText>> };

export function saveEvent(input: EventInput, id?: number): number {
  const d = db();
  d.exec("BEGIN");
  try {
    let eventId = id;
    const vals = [
      input.slug, input.type, input.mode, input.status, input.featured, input.client, input.starts_at, input.ends_at,
      input.year, input.cover, input.registration_open, input.capacity, input.sort,
    ];
    if (eventId) {
      d.prepare(
        `UPDATE events SET slug=?, type=?, mode=?, status=?, featured=?, client=?, starts_at=?, ends_at=?, year=?, cover=?,
         registration_open=?, capacity=?, sort=?, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?`
      ).run(...vals, eventId);
    } else {
      const r = d
        .prepare(
          `INSERT INTO events (slug, type, mode, status, featured, client, starts_at, ends_at, year, cover, registration_open, capacity, sort)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
        )
        .run(...vals);
      eventId = Number(r.lastInsertRowid);
    }
    if (input.featured) d.prepare("UPDATE events SET featured = 0 WHERE id != ?").run(eventId);
    const up = d.prepare(
      `INSERT INTO event_i18n (event_id, locale, title, summary, venue, audience, body) VALUES (?,?,?,?,?,?,?)
       ON CONFLICT(event_id, locale) DO UPDATE SET title=excluded.title, summary=excluded.summary, venue=excluded.venue,
       audience=excluded.audience, body=excluded.body`
    );
    const del = d.prepare("DELETE FROM event_i18n WHERE event_id = ? AND locale = ?");
    for (const l of locales) {
      const t = input.texts[l];
      if (t && Object.values(t).some((v) => v.trim())) up.run(eventId, l, t.title, t.summary, t.venue, t.audience, t.body);
      else del.run(eventId, l);
    }
    d.exec("COMMIT");
    return eventId;
  } catch (e) {
    d.exec("ROLLBACK");
    throw e;
  }
}

export function deleteEvent(id: number) {
  db().prepare("DELETE FROM events WHERE id = ?").run(id);
}

export function slugTaken(slug: string, exceptId?: number) {
  return !!db().prepare("SELECT 1 FROM events WHERE slug = ? AND id != ?").get(slug, exceptId ?? 0);
}
