"use client";

import Link from "next/link";
import { useState } from "react";
import { upcomingEvents, type UpcomingEvent } from "@/data/site";
import { Eyebrow, H2 } from "./ui";

const filterNames = ["All", "Seminar", "Summit", "Roadshow", "Exhibition"];

function calendarHref(e: UpcomingEvent) {
  if (!e.startsAt) return null;
  const start = new Date(e.startsAt);
  const end = new Date(start.getTime() + 4 * 3600000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: e.title, dates: `${f(start)}/${f(end)}`, location: e.venue, details: e.audience });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export function EventsSection() {
  const [filter, setFilter] = useState("All");
  const events = upcomingEvents.filter((e) => filter === "All" || e.type === filter.toUpperCase());

  return (
    <section id="events" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pt-[104px] pb-10">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>01 — UPCOMING EVENTS</Eyebrow>
          <H2 className="max-w-[720px]">Join our next event.</H2>
          <p className="mt-4 max-w-[620px] text-lg text-muted">
            Seminars, summits, roadshows and exhibitions open for registration now. Many are free for qualified attendees.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events">
          {filterNames.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={filter === n}
              onClick={() => setFilter(n)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] ${
                filter === n ? "border-accent bg-accent font-semibold text-ink" : "border-edge-2 font-medium text-soft"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {events.map((ev) => {
          const cal = calendarHref(ev);
          return (
            <article key={ev.slug} className="flex min-w-0 flex-[1_1_280px] flex-col overflow-hidden rounded-[18px] border border-line-2 bg-panel">
              <div className="ph flex h-[150px] items-start justify-between p-3.5">
                <span className="rounded-md bg-ink px-2.5 py-1.5 font-mono text-xs text-accent">{ev.type}</span>
                <span className="rounded-md bg-ink px-2.5 py-1.5 font-mono text-xs text-soft">{ev.mode}</span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-[22px]">
                <div className="font-mono text-[13px] text-dim">
                  {ev.dateLabel} · {ev.venue}
                </div>
                <h3 className="m-0 font-display text-[22px] leading-tight tracking-[-0.015em]">{ev.title}</h3>
                <p className="m-0 text-[15px] leading-normal text-muted-2">{ev.audience}</p>
                <div className="mt-auto flex flex-wrap gap-2.5 pt-2.5">
                  <Link href={`/events/${ev.slug}`} className="flex-auto rounded-[10px] bg-accent px-4 py-3 text-center text-[15px] font-semibold text-ink">
                    Register free
                  </Link>
                  {cal ? (
                    <a href={cal} target="_blank" rel="noreferrer" className="rounded-[10px] border border-edge-2 px-3.5 py-3 text-center text-[15px]">
                      + Calendar
                    </a>
                  ) : (
                    <span className="rounded-[10px] border border-line-2 px-3.5 py-3 text-center text-[15px] text-dim" title="Date to be confirmed">
                      Date TBC
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        {events.length === 0 && <p className="text-muted">No events in this category yet.</p>}
      </div>
    </section>
  );
}
