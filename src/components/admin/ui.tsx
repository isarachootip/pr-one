export function PageHead({ title, children, sub }: { title: string; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="m-0 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{title}</h1>
        {sub && <p className="mt-2 mb-0 text-muted">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export const btn = "inline-flex min-h-10 items-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink";
export const btnGhost = "inline-flex min-h-10 items-center rounded-full border border-edge-2 px-5 py-2 text-sm text-fg hover:border-soft";

export function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "accent" | "muted" | "warn" }) {
  const c = tone === "accent" ? "bg-accent text-ink" : tone === "warn" ? "bg-[#FFB86B] text-ink" : "bg-line-2 text-soft";
  return <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[11px] ${c}`}>{children}</span>;
}

export const bkk = (iso: string | null, time = true) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", day: "2-digit", month: "short", year: "numeric", ...(time ? { hour: "2-digit", minute: "2-digit" } : {}) }).format(new Date(iso))
    : "—";

export function Table({ head, children, empty }: { head: string[]; children: React.ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line-2">
      <table className="w-full min-w-[720px] border-collapse text-start text-sm">
        <thead className="bg-panel font-mono text-xs text-dim">
          <tr>{head.map((h) => <th key={h} className="px-3 py-3 text-start font-normal">{h}</th>)}</tr>
        </thead>
        <tbody>
          {empty ? (
            <tr><td colSpan={head.length} className="px-3 py-8 text-center text-dim">Nothing here yet</td></tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
