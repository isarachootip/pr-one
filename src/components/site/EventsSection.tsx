"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import type { PublicEvent } from "@/lib/events";

/** Client-side type filter; cards are rendered on the server and passed in. */
export function EventsFilter({
  events,
  cards,
  t,
}: {
  events: Pick<PublicEvent, "slug" | "type">[];
  cards: Record<string, React.ReactNode>;
  t: Dict;
  lang: Locale;
}) {
  const types = Array.from(new Set(events.map((e) => e.type)));
  const [filter, setFilter] = useState<string>("ALL");
  const shown = events.filter((e) => filter === "ALL" || e.type === filter);
  return (
    <>
      {types.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group">
          {["ALL", ...types].map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] ${
                filter === k ? "border-accent bg-accent font-semibold text-ink" : "border-edge-2 font-medium text-soft"
              }`}
            >
              {k === "ALL" ? t.events.all : t.types[k] ?? k}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-5">{shown.map((e) => <div key={e.slug} className="flex">{cards[e.slug]}</div>)}</div>
      {shown.length === 0 && <p className="text-muted">{t.events.noFilterMatch}</p>}
    </>
  );
}
