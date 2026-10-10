import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getPublishedEvents } from "@/lib/events";
import { EventCard } from "@/components/site/EventCard";
import { EventsFilter } from "@/components/site/EventsSection";
import { H2 } from "@/components/site/ui";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: `${t.events.pageTitle} | PR One`, description: t.events.pageSub };
}

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const { upcoming, past } = getPublishedEvents(lang);
  const card = (e: (typeof past)[number]) => <EventCard key={e.slug} e={e} lang={lang} t={t} />;

  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-24">
      <h1 className="mb-3 font-display text-[clamp(40px,5vw,72px)] font-bold tracking-[-0.03em]">{t.events.pageTitle}</h1>
      <p className="mb-14 max-w-[640px] text-lg text-muted">{t.events.pageSub}</p>

      <H2 className="mb-6 text-[32px]!">{t.events.upcomingHeading}</H2>
      {upcoming.length ? (
        <EventsFilter events={upcoming} cards={Object.fromEntries(upcoming.map((e) => [e.slug, card(e)]))} t={t} lang={lang} />
      ) : (
        <div className="rounded-[22px] border border-dashed border-edge-2 p-8">
          <h3 className="mb-2 font-display text-2xl">{t.events.emptyTitle}</h3>
          <p className="m-0 max-w-[560px] text-muted">{t.events.emptyBody}</p>
        </div>
      )}

      {past.length > 0 && (
        <>
          <H2 className="mt-20 mb-6 text-[32px]!">{t.events.pastHeading}</H2>
          <EventsFilter events={past} cards={Object.fromEntries(past.map((e) => [e.slug, card(e)]))} t={t} lang={lang} />
        </>
      )}
    </div>
  );
}
