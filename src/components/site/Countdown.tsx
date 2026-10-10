"use client";

import { useEffect, useState } from "react";

export function Countdown({ to, labels }: { to: string | null; labels: [string, string, string, string] }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!to) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [to]);
  const diff = to && now !== null ? Math.max(0, new Date(to).getTime() - now) : null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const parts = diff === null ? null : [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60].map(pad);
  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off" dir="ltr">
      {labels.map((u, i) => (
        <div key={u} className="rounded-[10px] border border-line bg-ink py-2.5 text-center">
          <div className="font-display text-[26px] font-semibold tabular-nums">{parts ? parts[i] : "--"}</div>
          <div className="font-mono text-[11px] text-dim">{u}</div>
        </div>
      ))}
    </div>
  );
}
