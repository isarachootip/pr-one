import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import type { PublicEvent } from "@/lib/events";
import { eventDateLabel } from "@/lib/format";
import { Countdown } from "./Countdown";
import { Cover } from "./ui";

export function Hero({ lang, t, featured, brandCount }: { lang: Locale; t: Dict; featured: PublicEvent | null; brandCount: number }) {
  const f = t.featured;
  const stats = [
    { value: "2004", label: t.stats.since },
    { value: `${brandCount}+`, label: t.stats.brands },
    { value: `${new Date().getFullYear() - 2004}+`, label: t.stats.years },
    { value: t.stats.modesValue, label: t.stats.modes, accent: true },
  ];
  const canRegister = featured && featured.isUpcoming && featured.registrationOpen && !featured.isFull;
  const badge = !featured ? "" : !featured.isUpcoming ? f.completed : featured.isFull ? f.full : featured.registrationOpen ? f.open : "";

  return (
    <section id="top" className="grid-bg border-b border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-14 px-6 pt-[72px] pb-[64px] lg:pt-[88px]">
        <div className="min-w-0 flex-[1_1_520px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-edge px-3.5 py-2 font-mono text-[13px] tracking-[0.06em] text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {t.hero.eyebrow}
          </div>
          <h1 className="mt-7 mb-6 font-display text-[clamp(40px,6vw,88px)] font-bold leading-[1.05] tracking-[-0.03em]">
            {t.hero.h1a}
            <br />
            <span className="text-accent">{t.hero.h1b}</span>
          </h1>
          <p className="mb-9 max-w-[600px] text-xl leading-relaxed text-muted">{t.hero.sub}</p>
          <div className="flex flex-wrap gap-3.5">
            <Link href={`/${lang}/events`} className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink">
              {t.hero.cta1} <span className="rtl:hidden">→</span><span className="hidden rtl:inline">←</span>
            </Link>
            <Link href={`/${lang}#contact`} className="rounded-full border border-edge-2 px-7 py-4 text-[17px] font-medium">
              {t.hero.cta2}
            </Link>
          </div>
        </div>

        {featured && (
          <div className="min-w-0 max-w-[540px] flex-[1_1_400px]">
            <article className="overflow-hidden rounded-[20px] border border-edge bg-panel">
              <div className="relative">
                <Cover src={featured.cover} alt={featured.title} className="h-[260px] w-full" />
                {badge && (
                  <span className="absolute end-4 bottom-4 rounded-md bg-ink/90 px-2.5 py-1.5 font-mono text-xs text-accent">● {badge}</span>
                )}
              </div>
              <div className="p-6">
                <div className="font-mono text-[13px] tracking-[0.06em] text-dim">
                  {featured.isUpcoming ? f.nextOnStage : f.latest} · {t.types[featured.type] ?? featured.type}
                </div>
                <h2 className="mt-2 mb-3.5 font-display text-[26px] leading-[1.2] tracking-[-0.02em]">{featured.title}</h2>
                <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted">
                  <span>{eventDateLabel(featured, lang, t.events.dateTbc)}</span>
                  {featured.venue && <span>{featured.venue}</span>}
                  {featured.client && !featured.title.includes(featured.client) && <span>{featured.client}</span>}
                </div>
                {featured.isUpcoming && featured.startsAt && (
                  <div className="mb-5">
                    <Countdown to={featured.startsAt} labels={[f.days, f.hrs, f.min, f.sec]} />
                  </div>
                )}
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href={`/${lang}/events/${featured.slug}`}
                    className="flex-auto rounded-xl bg-accent p-3.5 text-center text-base font-semibold text-ink"
                  >
                    {canRegister ? f.reserve : f.view}
                  </Link>
                  <Link href={`/${lang}/events`} className="rounded-xl border border-edge-2 px-4 py-3.5 text-center text-base">
                    {f.seeAll}
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}
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
