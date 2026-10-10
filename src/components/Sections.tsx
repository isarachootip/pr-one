import { asset, clients, company, contacts, industries, services, socials, team, telHref, trustedBy } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { SubscribeForm } from "./SubscribeForm";
import { Eyebrow, H2 } from "./ui";

export function TrustedBy() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-10 gap-y-4 px-6 py-8">
        <span className="font-mono text-[13px] tracking-[0.08em] text-dim">TRUSTED BY</span>
        {trustedBy.map((m) => (
          <span key={m} className="font-display text-[22px] font-semibold tracking-[-0.01em] text-faint">
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-[104px]">
      <Eyebrow>03 — WHAT WE DO</Eyebrow>
      <H2 className="mb-12 max-w-[820px]">One team from invitation list to post-event leads.</H2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-[20px] border border-line-2 bg-line-2">
        {services.map((s, i) => (
          <div key={s.title} className="flex flex-col gap-3.5 bg-ink p-8">
            <div className="font-mono text-sm text-accent">/{String(i + 1).padStart(2, "0")}</div>
            <h3 className="m-0 font-display text-2xl">{s.title}</h3>
            <p className="m-0 leading-relaxed text-muted-2">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <span className="mr-2 font-mono text-[13px] tracking-[0.08em] text-dim">INDUSTRIES WE SERVE</span>
        <span className="rounded-full bg-accent px-4 py-2.5 text-[15px] font-semibold text-ink">IT &amp; Software · our specialty</span>
        {industries.map((x) => (
          <span key={x} className="rounded-full border border-edge-2 px-4 py-2.5 text-[15px] text-soft">
            {x}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section id="clients" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>04 — CLIENTS</Eyebrow>
            <H2 className="max-w-[820px]">Trusted by global tech leaders — and brands across Thailand.</H2>
          </div>
          <span className="text-[15px] text-dim">[Replace names with client logos]</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
          {clients.map((c) => (
            <div key={c} className="flex h-[84px] items-center justify-center rounded-xl border border-line-2 font-display text-[19px] font-semibold text-soft">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24">
        <Eyebrow>05 — OUR TEAM</Eyebrow>
        <H2 className="mb-12 max-w-[820px]">The people behind every stage.</H2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {team.map((m) => (
            <article key={m.email} className="overflow-hidden rounded-[18px] border border-line-2 bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(m.photo)} alt={m.name} loading="lazy" className="aspect-[4/5] w-full bg-ink-2 object-cover object-top" />
              <div className="p-5">
                <div className="text-[17px] font-semibold">{m.name}</div>
                <div className="mb-3 text-sm text-accent">{m.role}</div>
                <a href={`mailto:${m.email}`} className="block truncate text-sm text-soft hover:text-white">{m.email}</a>
                <a href={telHref(m.phone)} className="block text-sm text-muted-2 hover:text-white">{m.phone}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const icon = {
  people: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M18 14a6 6 0 0 1 3.5 6" />
    </svg>
  ),
  case: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  play: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 7.5v9l7.5-4.5z" /></svg>
  ),
  cam: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" />
    </svg>
  ),
};

const socialRows = [
  { name: "Facebook", desc: "Event photos, live updates", color: "#1877F2", href: socials.facebook, icon: icon.people },
  { name: "LinkedIn", desc: "Case studies for IT leaders", color: "#0A66C2", href: socials.linkedin, icon: icon.case },
  { name: "YouTube", desc: "Session recordings & highlights", color: "#E62117", href: socials.youtube, icon: icon.play },
  { name: "Instagram", desc: "Behind the scenes", color: "#C13584", href: socials.instagram, icon: icon.cam },
];

export function Connect() {
  return (
    <section id="connect" className="scroll-mt-24 border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-[104px]">
        <Eyebrow>06 — STAY CONNECTED</Eyebrow>
        <H2 className="mb-12 max-w-[760px]">Never miss an invitation.</H2>

        <div className="flex flex-wrap gap-5">
          <div className="flex min-w-0 flex-[2_1_420px] flex-wrap items-center gap-7 rounded-[22px] bg-[#06C755] p-8 text-[#04150A]">
            <div className="flex-[1_1_240px]">
              <div className="flex items-center gap-2.5 font-mono text-[15px] font-bold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.3 9 9 0 0 1-3.6-.7L3 21l1.6-4.4A8 8 0 0 1 3 11.5 8.6 8.6 0 0 1 12 3a8.6 8.6 0 0 1 9 8.5z" />
                </svg>
                LINE OFFICIAL ACCOUNT
              </div>
              <h3 className="mt-3.5 mb-2.5 font-display text-[34px] leading-[1.1] tracking-[-0.02em]">Add us on LINE for seat alerts &amp; reminders</h3>
              <p className="mb-5 text-base leading-normal">Get new event invitations, venue maps and day-of updates straight to your phone.</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a href={socials.lineUrl} className="rounded-full bg-[#04150A] px-[22px] py-3.5 font-semibold text-white">Add friend</a>
                <span className="font-mono font-medium">{socials.lineId}</span>
              </div>
            </div>
            <div className="flex h-[148px] w-[148px] items-center justify-center rounded-[14px] bg-white text-center font-mono text-xs">
              [LINE QR<br />CODE]
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
            {socialRows.map((s) => (
              <a key={s.name} href={s.href} className="flex items-center gap-4 rounded-2xl border border-line-2 bg-panel px-5 py-[18px] hover:border-edge-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: s.color }}>
                  {s.icon}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{s.name}</span>
                  <span className="text-sm text-muted-2">{s.desc}</span>
                </span>
                <span className="text-dim">→</span>
              </a>
            ))}
          </div>
        </div>

        <SubscribeForm />
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pt-[104px] pb-[72px]">
      <div className="flex flex-wrap gap-12">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>07 — PLAN YOUR EVENT</Eyebrow>
          <h2 className="mb-6 font-display text-[clamp(38px,5vw,72px)] font-bold leading-none tracking-[-0.035em]">
            Have a launch, summit or roadshow coming up?
          </h2>
          <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-muted">
            Tell us the date and the audience. We will come back with a plan and budget within {company.replyTime}.
          </p>
          <a href={telHref(company.mainPhone)} className="inline-block rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink">
            Call {company.mainPhone}
          </a>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {contacts.map((c) => (
              <div key={c.email} className="rounded-2xl border border-line-2 bg-panel p-[22px]">
                <div className="mb-2.5 font-mono text-xs text-dim">{c.dept}</div>
                <div className="text-[17px] font-semibold">{c.name}</div>
                <div className="mb-3 text-sm text-muted-2">{c.role}</div>
                <a href={`mailto:${c.email}`} className="block text-[15px] text-accent">{c.email}</a>
                <a href={telHref(c.phone)} className="block text-[15px] text-soft">{c.phone}</a>
              </div>
            ))}
            <div className="rounded-2xl border border-line-2 bg-panel p-[22px]">
              <div className="mb-2.5 font-mono text-xs text-dim">OFFICE</div>
              <div className="text-[15px] leading-relaxed text-soft">{company.address}</div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
