"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { featuredEvent, stats } from "@/data/site";
import { useCopy, useLang } from "./LangProvider";

function useCountdown(iso: string | null) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!iso) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (!iso || now === null) return null;
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    pad(Math.floor(diff / 86400000)),
    pad(Math.floor(diff / 3600000) % 24),
    pad(Math.floor(diff / 60000) % 60),
    pad(Math.floor(diff / 1000) % 60),
  ];
}

export function Hero() {
  const t = useCopy();
  const { lang } = useLang();
  const cd = useCountdown(featuredEvent.startsAt);
  const units = ["DAYS", "HRS", "MIN", "SEC"];

  return (
    <section id="top" className="grid-bg border-b border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-14 px-6 pt-[88px] pb-[72px]">
        <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-w-0 flex-[1_1_560px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-edge px-3.5 py-2 font-mono text-[13px] tracking-[0.08em] text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {t.eyebrow}
          </div>
          <h1 className="mt-7 mb-6 font-display text-[clamp(44px,6.2vw,92px)] font-bold leading-none tracking-[-0.035em]">
            {t.h1a}
            <br />
            <span className="text-accent">{t.h1b}</span>
          </h1>
          <p className="mb-9 max-w-[600px] text-xl leading-relaxed text-muted">{t.sub}</p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/#events" className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink">
              {t.cta1} →
            </Link>
            <Link href="/#contact" className="rounded-full border border-edge-2 px-7 py-4 text-[17px] font-medium">
              {t.cta2}
            </Link>
          </div>
        </div>

        <div className="min-w-0 max-w-[520px] flex-[1_1_400px]">
          <div className="overflow-hidden rounded-[20px] border border-edge bg-panel">
            <div className="ph flex h-[220px] items-end justify-between p-[18px]">
              <span className="font-mono text-xs text-dim">[KEY VISUAL / EVENT PHOTO]</span>
              <span className="rounded-md bg-ink px-2.5 py-1.5 font-mono text-xs text-accent">● REGISTRATION OPEN</span>
            </div>
            <div className="p-6">
              <div className="font-mono text-[13px] tracking-[0.06em] text-dim">NEXT ON STAGE</div>
              <h2 className="mt-2 mb-3.5 font-display text-[28px] leading-[1.15] tracking-[-0.02em]">{featuredEvent.title}</h2>
              <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted">
                <span>{featuredEvent.dateLabel}</span>
                <span>{featuredEvent.venue}</span>
                <span>{featuredEvent.price}</span>
              </div>
              <div className="mb-5 grid grid-cols-4 gap-2" aria-label="Countdown">
                {units.map((u, i) => (
                  <div key={u} className="rounded-[10px] border border-line bg-ink py-2.5 text-center">
                    <div className="font-display text-[26px] font-semibold">{cd ? cd[i] : "--"}</div>
                    <div className="font-mono text-[11px] text-dim">{u}</div>
                  </div>
                ))}
              </div>
              <Link
                href={`/events/${featuredEvent.slug}`}
                className="block rounded-xl bg-accent p-3.5 text-center text-base font-semibold text-ink"
              >
                Reserve my seat
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-x-12 gap-y-6 px-6 py-7">
          {stats.map((s) => (
            <div key={s.label}>
              <div className={`font-display text-[40px] font-bold tracking-[-0.03em] ${s.accent ? "text-accent" : ""}`}>{s.value}</div>
              <div className="text-sm text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
