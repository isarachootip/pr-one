import { db } from "@/lib/db";
import { Badge, bkk, btn, PageHead } from "@/components/admin/ui";
import { toggleHandledAction } from "../actions";

export const dynamic = "force-dynamic";

type Row = { id: number; name: string; company: string; email: string; phone: string; event_type: string; event_date: string; audience: string; message: string; locale: string; handled: number; created_at: string };

export default function Inbox() {
  const rows = db().prepare("SELECT * FROM contacts ORDER BY handled ASC, created_at DESC").all() as unknown as Row[];
  return (
    <>
      <PageHead title="Proposal requests" sub={`${rows.filter((r) => !r.handled).length} waiting for a reply`}>
        <a href="/api/admin/export?c=contacts" className={btn}>Download CSV</a>
      </PageHead>
      {!rows.length && <p className="text-dim">No requests yet.</p>}
      <div className="grid gap-4">
        {rows.map((r) => (
          <article key={r.id} className={`rounded-2xl border p-5 ${r.handled ? "border-line-2 opacity-60" : "border-edge-2 bg-panel"}`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-semibold">{r.name}</span>
                {r.company && <span className="text-muted"> · {r.company}</span>}
                <span className="ms-2 font-mono text-xs uppercase text-dim">{r.locale}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-dim">{bkk(r.created_at)}</span>
                <form action={toggleHandledAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="rounded-full border border-edge-2 px-3 py-1 text-xs">{r.handled ? "Mark as new" : "Mark as handled"}</button>
                </form>
              </div>
            </div>
            <div className="mb-3 flex flex-wrap gap-2 text-sm">
              {r.event_type && <Badge>{r.event_type}</Badge>}
              {r.audience && <Badge>{r.audience} people</Badge>}
              {r.event_date && <Badge tone="accent">{r.event_date}</Badge>}
            </div>
            <p className="mb-3 whitespace-pre-line text-soft">{r.message}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${r.email}`} className="text-accent">{r.email}</a>
              {r.phone && <a href={`tel:${r.phone}`} className="text-soft">{r.phone}</a>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
