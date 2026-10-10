"use client";

import Link from "next/link";
import { useState } from "react";
import { fmt, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { Eyebrow, H2 } from "./ui";

export type RoadmapEvent = { slug: string; title: string; client: string; type: string; cover: string; year: number };

export function Roadmap({ lang, t, events }: { lang: Locale; t: Dict; events: RoadmapEvent[] }) {
  const years = Array.from(new Set(events.map((e) => e.year))).sort((a, b) => a - b);
  const [year, setYear] = useState(years[years.length - 1]);
  if (!years.length) return null;
  const items = events.filter((e) => e.year === year);
  const r = t.roadmap;
  const nextYear = new Date().getFullYear() + 1;

  return (
    <section id="roadmap" className="scroll-mt-24 border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-[104px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{r.eyebrow}</Eyebrow>
            <H2 className="max-w-[760px]">{r.title}</H2>
          </div>
          <p className="m-0 max-w-[420px] text-[17px] text-muted">{r.sub}</p>
        </div>

        <div className="relative overflow-x-auto pb-2">
          <div className="relative flex gap-3" style={{ minWidth: `${(years.length + 2) * 120}px` }}>
            <div className="absolute inset-x-0 top-[27px] h-0.5 bg-edge" />
            <div className="relative flex flex-1 flex-col items-start gap-3.5 pt-[18px]">
              <span className="h-5 w-5 rounded-full border-2 border-[#5B6884] bg-ink-2" />
              <div>
                <div className="font-display text-[28px] font-bold text-faint">2004</div>
                <div className="text-[13px] text-dim">{r.founded}</div>
              </div>
            </div>
            {years.map((y) => {
              const on = y === year;
              return (
                <button
                  key={y}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setYear(y)}
                  className="relative flex min-h-11 flex-1 flex-col items-start gap-1.5 bg-transparent pt-[18px] text-start"
                >
                  <span
                    className={`mb-2 h-5 w-5 rounded-full border-2 ${
                      on ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(198,244,50,0.15)]" : "border-[#5B6884] bg-ink-2"
                    }`}
                  />
                  <span className={`font-display text-[28px] font-bold ${on ? "text-fg" : "text-faint"}`}>{y}</span>
                  <span className="text-[13px] text-dim">{fmt(r.count, { n: events.filter((e) => e.year === y).length })}</span>
                </button>
              );
            })}
            <div className="relative flex flex-1 flex-col items-start gap-3.5 pt-[18px]">
              <span className="h-5 w-5 rounded-full border-2 border-dashed border-accent bg-ink-2" />
              <div>
                <div className="font-display text-[28px] font-bold text-accent">{nextYear}</div>
                <div className="text-[13px] text-dim">{r.next}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[22px] border border-line-2 bg-panel p-5 sm:p-8">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="m-0 font-display text-4xl tracking-[-0.02em] text-accent">{year}</h3>
            <span className="font-mono text-sm text-dim">{fmt(r.delivered, { n: items.length })}</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            {items.map((it) => (
              <Link key={it.slug} href={`/${lang}/events/${it.slug}`} className="group flex flex-col gap-3 rounded-[14px] border border-line-2 bg-ink p-3.5 hover:border-edge-2">
                {it.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.cover} alt={it.title} loading="lazy" className="h-[160px] w-full rounded-[10px] bg-panel object-cover" />
                ) : (
                  <div className="ph h-[160px] rounded-[10px]" />
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-xs text-muted-2">{it.client.toUpperCase()}</span>
                  <span className="shrink-0 rounded-[5px] bg-soft px-2 py-1 font-mono text-[11px] text-ink">{t.types[it.type] ?? it.type}</span>
                </div>
                <div className="font-display text-lg font-semibold leading-tight text-fg group-hover:text-accent">{it.title}</div>
              </Link>
            ))}
            {year === years[years.length - 1] && (
              <Link href={`/${lang}#contact`} className="flex min-h-[230px] flex-col justify-end gap-2 rounded-[14px] border border-dashed border-accent bg-ink p-5">
                <span className="font-display text-xl font-semibold text-accent">{r.slotTitle}</span>
                <span className="text-sm text-muted">{r.slotBody}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
