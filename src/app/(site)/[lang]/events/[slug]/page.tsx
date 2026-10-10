import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getPublishedEvent } from "@/lib/events";
import { calendarHref, eventDateLabel, formatDate, formatRange } from "@/lib/format";
import { RegisterForm } from "@/components/site/RegisterForm";
import { Cover } from "@/components/site/ui";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const e = getPublishedEvent(slug, lang);
  if (!e) return {};
  return { title: `${e.title} | PR One`, description: e.summary || e.audience, openGraph: e.cover ? { images: [e.cover] } : undefined };
}

export default async function EventPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const e = getPublishedEvent(slug, lang as Locale);
  if (!e) notFound();
  const t = await getDictionary(lang);
  const r = t.register;
  const cal = e.isUpcoming ? calendarHref(e) : null;
  const dateText = e.startsAt
    ? e.endsAt
      ? formatRange(e.startsAt, e.endsAt, lang, e.isUpcoming)
      : formatDate(e.startsAt, lang, e.isUpcoming)
    : eventDateLabel(e, lang, t.events.dateTbc);
  const rows: [string, string][] = [
    [r.date, dateText],
    [r.venue, e.venue || (e.isUpcoming ? t.events.venueTbc : "")],
    [r.format, t.modes[e.mode] ?? e.mode],
    [r.audience, e.audience],
  ].filter((x): x is [string, string] => !!x[1]);

  let side: React.ReactNode;
  if (!e.isUpcoming) side = <Notice text={r.pastNote} href={`/${lang}#contact`} cta={t.hero.cta2} />;
  else if (e.isFull) side = <Notice text={r.full} />;
  else if (!e.registrationOpen) side = <Notice text={r.closed} />;
  else side = <RegisterForm slug={e.slug} lang={lang} t={t} />;

  return (
    <div className="grid-bg border-b border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-12 px-6 pt-12 pb-24">
        <div className="min-w-0 flex-[1_1_460px]">
          <Link href={`/${lang}/events`} className="font-mono text-[13px] text-dim hover:text-fg">
            <span className="rtl:hidden">←</span><span className="hidden rtl:inline">→</span> {r.back}
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-md bg-panel px-2.5 py-1.5 font-mono text-xs text-accent">{t.types[e.type] ?? e.type}</span>
            {e.client && <span className="rounded-md bg-panel px-2.5 py-1.5 font-mono text-xs text-soft">{e.client}</span>}
          </div>
          <h1 className="mt-5 mb-5 font-display text-[clamp(34px,4.4vw,60px)] font-bold leading-[1.08] tracking-[-0.03em]">{e.title}</h1>
          {e.summary && <p className="mb-8 max-w-[620px] text-xl leading-relaxed text-muted">{e.summary}</p>}
          <dl className="mb-8 grid max-w-[620px] grid-cols-[110px_1fr] gap-x-6 gap-y-3 text-[16px]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-mono text-[13px] text-dim">{k}</dt>
                <dd className="m-0">{v}</dd>
              </div>
            ))}
          </dl>
          {cal && (
            <a href={cal} target="_blank" rel="noreferrer" className="mb-8 inline-block rounded-full border border-edge-2 px-5 py-2.5 text-[15px]">
              {t.events.calendar}
            </a>
          )}
          <Cover src={e.cover} alt={e.title} className="w-full max-w-[680px] rounded-[18px] max-h-[460px]" />
          {e.body && (
            <div className="mt-10 max-w-[680px]">
              <h2 className="mb-4 font-display text-2xl">{r.about}</h2>
              <div className="whitespace-pre-line text-[17px] leading-relaxed text-muted">{e.body}</div>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-[1_1_400px] lg:sticky lg:top-28 lg:self-start">{side}</div>
      </div>
    </div>
  );
}

function Notice({ text, href, cta }: { text: string; href?: string; cta?: string }) {
  return (
    <div className="rounded-[22px] border border-line-2 bg-panel p-8">
      <p className="m-0 text-lg text-muted">{text}</p>
      {href && (
        <Link href={href} className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-ink">
          {cta}
        </Link>
      )}
    </div>
  );
}
