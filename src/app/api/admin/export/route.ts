import { db } from "@/lib/db";

// CSV downloads for the admin area (protected by middleware).
const QUERIES: Record<string, { sql: string; name: string }> = {
  registrations: {
    sql: `SELECT r.id, r.created_at, e.slug AS event, r.first_name, r.last_name, r.email, r.phone, r.company, r.job_title, r.locale
          FROM registrations r JOIN events e ON e.id = r.event_id WHERE (? IS NULL OR r.event_id = ?) ORDER BY r.created_at DESC`,
    name: "registrations",
  },
  contacts: { sql: "SELECT * FROM contacts WHERE ? IS NULL OR ? IS NULL ORDER BY created_at DESC", name: "proposal-requests" },
  subscribers: { sql: "SELECT * FROM subscribers WHERE ? IS NULL OR ? IS NULL ORDER BY created_at DESC", name: "subscribers" },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = QUERIES[url.searchParams.get("c") ?? ""];
  if (!q) return new Response("Bad collection", { status: 400 });
  const ev = url.searchParams.get("event");
  const evId = ev ? Number(ev) : null;
  const rows = db().prepare(q.sql).all(evId, evId) as Record<string, unknown>[];
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = "﻿" + [cols.join(","), ...rows.map((r) => cols.map((k) => esc(r[k])).join(","))].join("\r\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${q.name}${evId ? `-event-${evId}` : ""}.csv"` },
  });
}
