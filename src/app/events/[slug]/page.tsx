import Link from "next/link";
import { notFound } from "next/navigation";
import { RegisterForm } from "@/components/RegisterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { upcomingEvents } from "@/data/site";

export function generateStaticParams() {
  return upcomingEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = upcomingEvents.find((e) => e.slug === slug);
  return { title: ev ? `Register — ${ev.title} | PR One` : "Event | PR One" };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = upcomingEvents.find((e) => e.slug === slug);
  if (!ev) notFound();

  return (
    <>
      <SiteHeader />
      <main className="grid-bg border-b border-line">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-12 px-6 pt-16 pb-24">
          <div className="min-w-0 flex-[1_1_440px]">
            <Link href="/#events" className="font-mono text-[13px] text-dim hover:text-fg">← ALL EVENTS</Link>
            <div className="mt-6 flex gap-2">
              <span className="rounded-md bg-panel px-2.5 py-1.5 font-mono text-xs text-accent">{ev.type}</span>
              <span className="rounded-md bg-panel px-2.5 py-1.5 font-mono text-xs text-soft">{ev.mode}</span>
            </div>
            <h1 className="mt-5 mb-5 font-display text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">{ev.title}</h1>
            <p className="mb-8 max-w-[560px] text-xl leading-relaxed text-muted">{ev.audience}</p>
            <dl className="grid max-w-[560px] grid-cols-[120px_1fr] gap-x-6 gap-y-3 text-[16px]">
              <dt className="font-mono text-[13px] text-dim">DATE</dt><dd className="m-0">{ev.dateLabel}</dd>
              <dt className="font-mono text-[13px] text-dim">VENUE</dt><dd className="m-0">{ev.venue}</dd>
              <dt className="font-mono text-[13px] text-dim">FORMAT</dt><dd className="m-0">{ev.mode.toLowerCase()}</dd>
              <dt className="font-mono text-[13px] text-dim">ADMISSION</dt><dd className="m-0">{ev.price}</dd>
            </dl>
            <div className="ph mt-10 flex h-[260px] max-w-[560px] items-end rounded-[18px] p-4">
              <span className="font-mono text-xs text-dim">[AGENDA / SPEAKERS / KEY VISUAL]</span>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <RegisterForm eventSlug={ev.slug} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
