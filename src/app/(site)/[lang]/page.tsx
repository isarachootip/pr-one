import Link from "next/link";
import { notFound } from "next/navigation";
import { clients } from "@/data/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getPublishedEvents } from "@/lib/events";
import { Hero } from "@/components/site/Hero";
import { EventCard } from "@/components/site/EventCard";
import { EventsFilter } from "@/components/site/EventsSection";
import { Roadmap } from "@/components/site/Roadmap";
import { Clients, Connect, Contact, Services, Team, TrustedBy } from "@/components/site/Sections";
import { Eyebrow, H2 } from "@/components/site/ui";

export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const { upcoming, past, featured } = getPublishedEvents(lang);
  const roadmapEvents = past.filter((e) => e.year).map((e) => ({ slug: e.slug, title: e.title, client: e.client, type: e.type, cover: e.cover, year: e.year! }));
  const cards = Object.fromEntries(upcoming.map((e) => [e.slug, <EventCard key={e.slug} e={e} lang={lang} t={t} />]));

  return (
    <>
      <Hero lang={lang} t={t} featured={featured} brandCount={Math.floor(clients.length / 10) * 10} />
      <TrustedBy t={t} />

      <section id="events" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pt-[104px] pb-[88px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{t.events.eyebrow}</Eyebrow>
            <H2 className="max-w-[720px]">{t.events.title}</H2>
            <p className="mt-4 max-w-[620px] text-lg text-muted">{t.events.sub}</p>
          </div>
          <Link href={`/${lang}/events`} className="rounded-full border border-edge-2 px-5 py-3 text-[15px]">
            {t.featured.seeAll}
          </Link>
        </div>
        {upcoming.length ? (
          <EventsFilter events={upcoming} cards={cards} t={t} lang={lang} />
        ) : (
          <div className="rounded-[22px] border border-dashed border-edge-2 p-8 sm:p-10">
            <h3 className="mb-2 font-display text-2xl">{t.events.emptyTitle}</h3>
            <p className="mb-6 max-w-[560px] text-muted">{t.events.emptyBody}</p>
            <Link href={`/${lang}#connect`} className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-ink">
              {t.connect.subscribe}
            </Link>
          </div>
        )}
      </section>

      <Roadmap lang={lang} t={t} events={roadmapEvents} />
      <Services t={t} />
      <Clients t={t} />
      <Team t={t} />
      <Connect lang={lang} t={t} />
      <Contact lang={lang} t={t} />
    </>
  );
}
