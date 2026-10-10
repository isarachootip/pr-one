import { db } from "@/lib/db";
import { bkk, btn, PageHead, Table } from "@/components/admin/ui";
import { deleteSubscriberAction } from "../actions";

export const dynamic = "force-dynamic";

export default function Subscribers() {
  const rows = db().prepare("SELECT * FROM subscribers ORDER BY created_at DESC").all() as unknown as { id: number; email: string; locale: string; created_at: string }[];
  return (
    <>
      <PageHead title="Subscribers" sub={`${rows.length} people receive the monthly event calendar`}>
        <a href="/api/admin/export?c=subscribers" className={btn}>Download CSV</a>
      </PageHead>
      <Table head={["DATE", "EMAIL", "LANGUAGE", ""]} empty={!rows.length}>
        {rows.map((r) => (
          <tr key={r.id} className="border-t border-line-2">
            <td className="px-3 py-3 text-dim">{bkk(r.created_at)}</td>
            <td className="px-3 py-3">{r.email}</td>
            <td className="px-3 py-3 font-mono text-xs uppercase text-dim">{r.locale}</td>
            <td className="px-3 py-3">
              <details>
                <summary className="cursor-pointer text-xs text-dim">Remove</summary>
                <form action={deleteSubscriberAction}><input type="hidden" name="id" value={r.id} /><button className="mt-1 text-xs text-[#FF9C8A]">Confirm</button></form>
              </details>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
