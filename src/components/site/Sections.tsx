import { asset, clients, company, contacts, socials, team, telHref, trustedBy } from "@/data/site";
import { fmt, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { ContactForm } from "./ContactForm";
import { SubscribeForm } from "./SubscribeForm";
import { Eyebrow, H2 } from "./ui";

export function TrustedBy({ t }: { t: Dict }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-10 gap-y-4 px-6 py-8">
        <span className="font-mono text-[13px] tracking-[0.08em] text-dim">{t.trustedBy}</span>
        {trustedBy.map((m) => (
          <span key={m} className="font-display text-[22px] font-semibold tracking-[-0.01em] text-faint" dir="ltr">
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Services({ t }: { t: Dict }) {
  const s = t.services;
  return (
    <section id="services" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-[104px]">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <H2 className="mb-12 max-w-[860px]">{s.title}</H2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px overflow-hidden rounded-[20px] border border-line-2 bg-line-2">
        {s.items.map((it, i) => (
          <div key={it.title} className="flex flex-col gap-3.5 bg-ink p-8">
            <div className="font-mono text-sm text-accent">/{String(i + 1).padStart(2, "0")}</div>
            <h3 className="m-0 font-display text-2xl">{it.title}</h3>
            <p className="m-0 leading-relaxed text-muted-2">{it.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <span className="me-2 font-mono text-[13px] tracking-[0.08em] text-dim">{s.industriesLabel}</span>
        <span className="rounded-full bg-accent px-4 py-2.5 text-[15px] font-semibold text-ink">{s.specialty}</span>
        {s.industries.map((x) => (
          <span key={x} className="rounded-full border border-edge-2 px-4 py-2.5 text-[15px] text-soft">
            {x}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Clients({ t }: { t: Dict }) {
  return (
    <section id="clients" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{t.clients.eyebrow}</Eyebrow>
            <H2 className="max-w-[820px]">{t.clients.title}</H2>
          </div>
          <span className="font-mono text-sm text-dim">{fmt(t.clients.brands, { n: clients.length })}</span>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 p-0">
          {clients.map((c) => (
            <li key={c.logo} className="flex h-[92px] items-center justify-center rounded-xl bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.logo)} alt={c.name} loading="lazy" className="max-h-full max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Team({ t }: { t: Dict }) {
  return (
    <section id="team" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24">
        <Eyebrow>{t.team.eyebrow}</Eyebrow>
        <H2 className="mb-12 max-w-[820px]">{t.team.title}</H2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
          {team.map((m) => (
            <article key={m.email} className="overflow-hidden rounded-[18px] border border-line-2 bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(m.photo)} alt={m.name} loading="lazy" className="aspect-[4/5] w-full bg-ink-2 object-cover object-top" />
              <div className="p-5">
                <div className="text-[17px] font-semibold" dir="ltr">{m.name}</div>
                <div className="mb-3 text-sm text-accent">{t.team.roles[m.role] ?? m.role}</div>
                <a href={`mailto:${m.email}`} dir="ltr" className="block truncate text-sm text-soft hover:text-white">{m.email}</a>
                <a href={telHref(m.phone)} dir="ltr" className="block text-sm text-muted-2 hover:text-white">{m.phone}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const icon = {
  people: <path d="M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />,
  case: <path d="M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  play: <path d="M9 7.5v9l7.5-4.5z" fill="currentColor" />,
  cam: <path d="M8.5 3.5h7a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5v-7a5 5 0 0 1 5-5zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
};

export function Connect({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.connect;
  const rows = [
    { name: "Facebook", desc: c.facebook, color: "#1877F2", href: socials.facebook, icon: icon.people },
    { name: "LinkedIn", desc: c.linkedin, color: "#0A66C2", href: socials.linkedin, icon: icon.case },
    { name: "YouTube", desc: c.youtube, color: "#E62117", href: socials.youtube, icon: icon.play },
    { name: "Instagram", desc: c.instagram, color: "#C13584", href: socials.instagram, icon: icon.cam },
  ];
  return (
    <section id="connect" className="scroll-mt-24 border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-[104px]">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <H2 className="mb-12 max-w-[760px]">{c.title}</H2>
        <div className="flex flex-wrap gap-5">
          <div className="flex min-w-0 flex-[2_1_420px] flex-wrap items-center gap-7 rounded-[22px] bg-[#06C755] p-6 text-[#04150A] sm:p-8">
            <div className="flex-[1_1_240px]">
              <div className="font-mono text-[15px] font-bold">{c.lineLabel}</div>
              <h3 className="mt-3.5 mb-2.5 font-display text-[30px] leading-[1.15] tracking-[-0.02em]">{c.lineTitle}</h3>
              <p className="mb-5 text-base leading-normal">{c.lineBody}</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a href={socials.lineUrl} className="rounded-full bg-[#04150A] px-[22px] py-3.5 font-semibold text-white">{c.addFriend}</a>
                <span className="font-mono font-medium" dir="ltr">{socials.lineId}</span>
              </div>
            </div>
            <div className="flex h-[148px] w-[148px] items-center justify-center rounded-[14px] bg-white p-3 text-center font-mono text-xs">[{c.qr}]</div>
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
            {rows.map((s) => (
              <a key={s.name} href={s.href} className="flex items-center gap-4 rounded-2xl border border-line-2 bg-panel px-5 py-[18px] hover:border-edge-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: s.color }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg>
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{s.name}</span>
                  <span className="text-sm text-muted-2">{s.desc}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <SubscribeForm lang={lang} t={t} />
      </div>
    </section>
  );
}

export function Contact({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.contact;
  return (
    <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pt-[104px] pb-[72px]">
      <div className="flex flex-wrap gap-12">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mb-6 font-display text-[clamp(36px,5vw,68px)] font-bold leading-[1.05] tracking-[-0.03em]">{c.title}</h2>
          <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-muted">{c.body}</p>
          <a href={telHref(company.mainPhone)} className="inline-block rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink">
            {fmt(c.call, { phone: "" })}<span dir="ltr">{company.mainPhone}</span>
          </a>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {contacts.map((p) => (
              <div key={p.email} className="rounded-2xl border border-line-2 bg-panel p-[22px]">
                <div className="mb-2.5 font-mono text-xs text-dim">{c.depts[p.dept]}</div>
                <div className="text-[17px] font-semibold" dir="ltr">{p.name}</div>
                <div className="mb-3 text-sm text-muted-2">{t.team.roles[p.role]}</div>
                <a href={`mailto:${p.email}`} dir="ltr" className="block text-[15px] text-accent">{p.email}</a>
                <a href={telHref(p.phone)} dir="ltr" className="block text-[15px] text-soft">{p.phone}</a>
              </div>
            ))}
            <div className="rounded-2xl border border-line-2 bg-panel p-[22px]">
              <div className="mb-2.5 font-mono text-xs text-dim">{c.office}</div>
              <div className="text-[15px] leading-relaxed text-soft" dir="ltr">{company.address}</div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <ContactForm lang={lang} t={t} />
        </div>
      </div>
    </section>
  );
}
