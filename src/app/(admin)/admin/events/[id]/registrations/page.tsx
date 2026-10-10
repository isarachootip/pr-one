import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getEventAdmin } from "@/lib/events";
import { bkk, btn, btnGhost, PageHead, Table } from "@/components/admin/ui";
import { deleteRegistrationAction } from "../../../actions";

export const dynamic = "force-dynamic";

type Reg = { id: number; first_name: string; last_name: string; email: string; phone: string; company: string; job_title: string; locale: string; created_at: string };

export default async function Registrations({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ev = getEventAdmin(Number(id));
  if (!ev) notFound();
  const rows = db().prepare("SELECT * FROM registrations WHERE event_id = ? ORDER BY created_at DESC").all(ev.id) as unknown as Reg[];
  const title = ev.texts.en?.title || ev.texts.th?.title || ev.slug;
  return (
    <>
      <PageHead title="Registrations" sub={<>{title} · <strong className="text-fg">{rows.length}{ev.capacity ? ` / ${ev.capacity}` : ""}</strong> registered</>}>
        <Link href={`/admin/events/${ev.id}`} className={btnGhost}>Edit event</Link>
        <a href={`/api/admin/export?c=registrations&event=${ev.id}`} className={btn}>Download CSV</a>
      </PageHead>
      <Table head={["DATE", "NAME", "COMPANY", "TITLE", "EMAIL", "PHONE", "LANG", ""]} empty={!rows.length}>
        {rows.map((r) => (
          <tr key={r.id} className="border-t border-line-2">
            <td className="px-3 py-3 whitespace-nowrap text-dim">{bkk(r.created_at)}</td>
            <td className="px-3 py-3">{r.first_name} {r.last_name}</td>
            <td className="px-3 py-3">{r.company}</td>
            <td className="px-3 py-3 text-dim">{r.job_title}</td>
            <td className="px-3 py-3"><a href={`mailto:${r.email}`} className="hover:text-accent">{r.email}</a></td>
            <td className="px-3 py-3 whitespace-nowrap">{r.phone}</td>
            <td className="px-3 py-3 font-mono text-xs uppercase text-dim">{r.locale}</td>
            <td className="px-3 py-3">
              <details>
                <summary className="cursor-pointer text-xs text-dim">Remove</summary>
                <form action={deleteRegistrationAction}><input type="hidden" name="id" value={r.id} /><button className="mt-1 text-xs text-[#FF9C8A]">Confirm</button></form>
              </details>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
