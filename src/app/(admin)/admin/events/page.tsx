import Link from "next/link";
import { listEventsAdmin } from "@/lib/events";
import { Badge, bkk, btn, PageHead, Table } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function EventsAdmin() {
  const events = listEventsAdmin();
  return (
    <>
      <PageHead title="Events" sub={`${events.length} events · upcoming ones appear in “Join our next event”; past ones appear in the roadmap.`}>
        <Link href="/admin/events/new" className={btn}>+ New event</Link>
      </PageHead>
      <Table head={["", "TITLE", "DATE / YEAR", "TYPE", "STATUS", "REG."]} empty={!events.length}>
        {events.map((e) => (
          <tr key={e.id} className="border-t border-line-2 align-middle">
            <td className="w-[76px] px-3 py-2">
              {e.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={e.cover} alt="" className="h-10 w-16 rounded object-cover" />
              ) : (
                <div className="ph h-10 w-16 rounded" />
              )}
            </td>
            <td className="px-3 py-2">
              <Link href={`/admin/events/${e.id}`} className="font-medium hover:text-accent">{e.title_en || e.title_th || e.slug}</Link>
              <div className="font-mono text-[11px] text-dim">/{e.slug}</div>
            </td>
            <td className="px-3 py-2 whitespace-nowrap text-dim">{e.starts_at ? bkk(e.starts_at, false) : e.year ?? "—"}</td>
            <td className="px-3 py-2 text-dim">{e.type}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              <Badge tone={e.status === "published" ? "accent" : "muted"}>{e.status}</Badge>{" "}
              {e.upcoming ? <Badge>upcoming</Badge> : <Badge>past</Badge>} {e.featured ? <Badge tone="warn">featured</Badge> : null}
            </td>
            <td className="px-3 py-2">
              <Link href={`/admin/events/${e.id}/registrations`} className="text-accent">{e.registrations}</Link>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
