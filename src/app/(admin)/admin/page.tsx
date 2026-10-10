import Link from "next/link";
import { db } from "@/lib/db";
import { listEventsAdmin } from "@/lib/events";
import { Badge, bkk, btn, PageHead, Table } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const d = db();
  const n = (sql: string) => (d.prepare(sql).get() as { n: number }).n;
  const events = listEventsAdmin();
  const upcoming = events.filter((e) => e.upcoming);
  const recent = d
    .prepare(
      `SELECT r.*, (SELECT title FROM event_i18n t WHERE t.event_id = r.event_id AND t.locale='en') AS event_title
       FROM registrations r ORDER BY r.created_at DESC LIMIT 8`
    )
    .all() as { id: number; event_id: number; first_name: string; last_name: string; company: string; email: string; created_at: string; event_title: string }[];

  const cards = [
    ["Upcoming events", upcoming.length, "/admin/events"],
    ["Registrations", n("SELECT COUNT(*) n FROM registrations"), "/admin/events"],
    ["New proposal requests", n("SELECT COUNT(*) n FROM contacts WHERE handled = 0"), "/admin/inbox"],
    ["Subscribers", n("SELECT COUNT(*) n FROM subscribers"), "/admin/subscribers"],
  ] as const;

  return (
    <>
      <PageHead title="Dashboard">
        <Link href="/admin/events/new" className={btn}>+ New event</Link>
      </PageHead>
      <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={href} className="rounded-2xl border border-line-2 bg-panel p-5 hover:border-edge-2">
            <div className="font-display text-4xl font-bold">{value}</div>
            <div className="mt-1 text-sm text-dim">{label}</div>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 font-display text-xl">Upcoming events</h2>
      <div className="mb-10">
        <Table head={["EVENT", "DATE", "STATUS", "REGISTRATIONS"]} empty={!upcoming.length}>
          {upcoming.map((e) => (
            <tr key={e.id} className="border-t border-line-2">
              <td className="px-3 py-3"><Link href={`/admin/events/${e.id}`} className="font-medium hover:text-accent">{e.title_en || e.title_th || e.slug}</Link></td>
              <td className="px-3 py-3 text-dim">{bkk(e.starts_at)}</td>
              <td className="px-3 py-3">
                <Badge tone={e.status === "published" ? "accent" : "muted"}>{e.status}</Badge>{" "}
                {e.registration_open ? <Badge>open</Badge> : <Badge tone="warn">closed</Badge>}
              </td>
              <td className="px-3 py-3"><Link href={`/admin/events/${e.id}/registrations`} className="text-accent">{e.registrations}{e.capacity ? ` / ${e.capacity}` : ""}</Link></td>
            </tr>
          ))}
        </Table>
        {!upcoming.length && <p className="mt-3 text-sm text-dim">No upcoming events — the home page is showing the latest past event. Create one to open registration.</p>}
      </div>

      <h2 className="mb-4 font-display text-xl">Latest registrations</h2>
      <Table head={["DATE", "NAME", "COMPANY", "EMAIL", "EVENT"]} empty={!recent.length}>
        {recent.map((r) => (
          <tr key={r.id} className="border-t border-line-2">
            <td className="px-3 py-3 whitespace-nowrap text-dim">{bkk(r.created_at)}</td>
            <td className="px-3 py-3">{r.first_name} {r.last_name}</td>
            <td className="px-3 py-3">{r.company}</td>
            <td className="px-3 py-3">{r.email}</td>
            <td className="px-3 py-3"><Link href={`/admin/events/${r.event_id}/registrations`} className="hover:text-accent">{r.event_title}</Link></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
