import { readAll } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin | PR One", robots: { index: false } };

type Row = Record<string, unknown> & { id: string; createdAt: string };

function Table({ title, c, rows, cols }: { title: string; c: string; rows: Row[]; cols: [string, string][] }) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="m-0 font-display text-2xl">
          {title} <span className="font-mono text-base text-accent">{rows.length}</span>
        </h2>
        <a href={`/api/admin/export?c=${c}`} className="rounded-full border border-edge-2 px-4 py-2 text-sm">Download CSV</a>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line-2">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-panel font-mono text-xs text-dim">
            <tr>
              <th className="px-3 py-3 font-normal">DATE</th>
              {cols.map(([, h]) => <th key={h} className="px-3 py-3 font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={cols.length + 1} className="px-3 py-6 text-center text-dim">Nothing yet</td></tr>
            )}
            {[...rows].reverse().map((r) => (
              <tr key={r.id} className="border-t border-line-2 align-top">
                <td className="whitespace-nowrap px-3 py-3 text-dim">{new Date(r.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })}</td>
                {cols.map(([k]) => <td key={k} className="max-w-[360px] px-3 py-3">{String(r[k] ?? "")}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function Admin() {
  const [registrations, contacts, subscribers] = await Promise.all([
    readAll("registrations"), readAll("contacts"), readAll("subscribers"),
  ]);
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="mb-2 font-mono text-[13px] tracking-[0.08em] text-accent">PR ONE · ADMIN</div>
      <h1 className="mb-10 font-display text-5xl font-bold tracking-[-0.03em]">Submissions</h1>
      <Table title="Event registrations" c="registrations" rows={registrations as Row[]} cols={[["eventTitle", "EVENT"], ["firstName", "FIRST"], ["lastName", "LAST"], ["email", "EMAIL"], ["phone", "PHONE"], ["company", "COMPANY"], ["jobTitle", "TITLE"]]} />
      <Table title="Proposal requests" c="contacts" rows={contacts as Row[]} cols={[["name", "NAME"], ["company", "COMPANY"], ["email", "EMAIL"], ["phone", "PHONE"], ["eventType", "TYPE"], ["eventDate", "DATE"], ["audience", "SIZE"], ["message", "MESSAGE"]]} />
      <Table title="Newsletter subscribers" c="subscribers" rows={subscribers as Row[]} cols={[["email", "EMAIL"]]} />
    </main>
  );
}
