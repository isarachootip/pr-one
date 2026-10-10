import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import type { PublicEvent } from "@/lib/events";
import { calendarHref, eventDateLabel } from "@/lib/format";
import { Cover } from "./ui";

export function EventCard({ e, lang, t }: { e: PublicEvent; lang: Locale; t: Dict }) {
  const cal = calendarHref(e);
  const canRegister = e.isUpcoming && e.registrationOpen && !e.isFull;
  return (
    <article className="flex w-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-line-2 bg-panel">
      <div className="relative">
        <Cover src={e.cover} alt={e.title} className="h-[180px] w-full" />
        <div className="absolute inset-x-3.5 top-3.5 flex justify-between gap-2">
          <span className="rounded-md bg-ink/90 px-2.5 py-1.5 font-mono text-xs text-accent">{t.types[e.type] ?? e.type}</span>
          {e.isUpcoming && <span className="rounded-md bg-ink/90 px-2.5 py-1.5 font-mono text-xs text-soft">{t.modes[e.mode] ?? e.mode}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <div className="font-mono text-[13px] text-dim">
          {eventDateLabel(e, lang, t.events.dateTbc)}
          {e.venue ? ` · ${e.venue}` : ""}
        </div>
        <h3 className="m-0 font-display text-[21px] leading-tight tracking-[-0.015em]">
          <Link href={`/${lang}/events/${e.slug}`} className="hover:text-accent">
            {e.title}
          </Link>
        </h3>
        {(e.summary || e.audience) && <p className="m-0 text-[15px] leading-normal text-muted-2">{e.summary || e.audience}</p>}
        {e.isUpcoming && (
          <div className="mt-auto flex flex-wrap gap-2.5 pt-2.5">
            <Link
              href={`/${lang}/events/${e.slug}`}
              className={`flex-auto rounded-[10px] px-4 py-3 text-center text-[15px] font-semibold ${canRegister ? "bg-accent text-ink" : "border border-edge-2"}`}
            >
              {canRegister ? t.events.register : t.events.details}
            </Link>
            {cal && (
              <a href={cal} target="_blank" rel="noreferrer" className="rounded-[10px] border border-edge-2 px-3.5 py-3 text-center text-[15px]">
                {t.events.calendar}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
