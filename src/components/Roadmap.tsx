"use client";

import Link from "next/link";
import { useState } from "react";
import { roadmap } from "@/data/site";
import { Eyebrow, H2 } from "./ui";

const realCount = (items: { type: string }[]) => items.filter((i) => i.type !== "OPEN SLOT").length;

export function Roadmap() {
  const [year, setYear] = useState(roadmap[roadmap.length - 1].year);
  const cur = roadmap.find((r) => r.year === year)!;

  return (
    <section id="roadmap" className="mt-16 scroll-mt-24 border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-[104px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>02 — EVENT ROADMAP</Eyebrow>
            <H2 className="max-w-[760px]">Every stage we have built, year by year.</H2>
          </div>
          <p className="m-0 max-w-[420px] text-[17px] text-muted">
            Pick a year to see the summits, kick-offs and press events PR One delivered for technology brands in Thailand and APAC.
          </p>
        </div>

        <div className="relative overflow-x-auto pb-2">
          <div className="relative flex min-w-[720px] gap-3">
            <div className="absolute inset-x-0 top-[27px] h-0.5 bg-edge" />
            <div className="relative flex flex-1 flex-col items-start gap-3.5 pt-[18px]">
              <span className="h-5 w-5 rounded-full border-2 border-[#5B6884] bg-ink-2" />
              <div>
                <div className="font-display text-[28px] font-bold text-faint">2004</div>
                <div className="text-[13px] text-dim">PR One founded</div>
              </div>
            </div>
            {roadmap.map((r) => {
              const on = r.year === year;
              return (
                <button
                  key={r.year}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setYear(r.year)}
                  className="relative flex min-h-11 flex-1 flex-col items-start gap-1.5 bg-transparent pt-[18px] text-left"
                >
                  <span
                    className={`mb-2 h-5 w-5 rounded-full border-2 ${
                      on ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(198,244,50,0.15)]" : "border-[#5B6884] bg-ink-2"
                    }`}
                  />
                  <span className={`font-display text-[28px] font-bold ${on ? "text-fg" : "text-faint"}`}>{r.year}</span>
                  <span className="text-[13px] text-dim">{realCount(r.items)} events</span>
                </button>
              );
            })}
            <div className="relative flex flex-1 flex-col items-start gap-3.5 pt-[18px]">
              <span className="h-5 w-5 rounded-full border-2 border-dashed border-accent bg-ink-2" />
              <div>
                <div className="font-display text-[28px] font-bold text-accent">2027</div>
                <div className="text-[13px] text-dim">Booking now</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[22px] border border-line-2 bg-panel p-8">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="m-0 font-display text-4xl tracking-[-0.02em]">
              <span className="text-accent">{cur.year}</span> · {cur.theme}
            </h3>
            <span className="font-mono text-sm text-dim">{realCount(cur.items)} events delivered</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {cur.items.map((it) => {
              const open = it.type === "OPEN SLOT";
              const Card = open ? Link : "div";
              return (
                <Card
                  key={it.title}
                  href={open ? "/#contact" : (undefined as never)}
                  className={`flex flex-col gap-3 rounded-[14px] bg-ink p-3.5 ${open ? "border border-dashed border-accent" : "border border-line-2"}`}
                >
                  <div className="ph flex h-[120px] items-end rounded-[10px] p-2.5">
                    <span className="font-mono text-[11px] text-dim">[EVENT PHOTO]</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-2">{it.client.toUpperCase()}</span>
                    <span className={`rounded-[5px] px-2 py-1 font-mono text-[11px] text-ink ${open ? "bg-accent" : "bg-soft"}`}>{it.type}</span>
                  </div>
                  <div className="font-display text-lg font-semibold leading-tight text-fg">{it.title}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
