import { readAll, type Collection } from "@/lib/store";

// CSV download for the admin page. Protected by middleware (basic auth).
export async function GET(req: Request) {
  const c = new URL(req.url).searchParams.get("c") as Collection;
  if (!["registrations", "contacts", "subscribers"].includes(c)) return new Response("Bad collection", { status: 400 });
  const rows = await readAll(c);
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = "﻿" + [cols.join(","), ...rows.map((r) => cols.map((k) => esc((r as Record<string, unknown>)[k])).join(","))].join("\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${c}.csv"` },
  });
}
