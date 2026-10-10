"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";

export function SiteHeader({ lang, t, logo }: { lang: Locale; t: Dict["nav"]; logo: string }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const rest = pathname.split("/").slice(2).join("/");
  const links: [string, string][] = [
    [t.events, `/${lang}/events`],
    [t.roadmap, `/${lang}#roadmap`],
    [t.services, `/${lang}#services`],
    [t.clients, `/${lang}#clients`],
    [t.team, `/${lang}#team`],
    [t.contact, `/${lang}#contact`],
  ];

  return (
    <header className="relative z-20 border-b border-line bg-[rgba(11,15,23,0.94)] backdrop-blur lg:sticky lg:top-0">
      <nav className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-[-0.02em]">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="PR One Network" className="h-full w-full object-contain" />
          </span>
          <span className="leading-none">
            PR ONE
            <span className="mt-1 block font-mono text-[10px] font-normal tracking-[0.3em] text-dim">NETWORK</span>
          </span>
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-edge lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <div
          id="site-menu"
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-4 pb-2 lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pb-0`}
        >
          <div className="flex flex-col gap-1 text-[15px] text-soft lg:flex-row lg:gap-x-5">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label={t.language} className="flex flex-wrap rounded-full border border-edge p-[3px]">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${rest ? `/${rest}` : ""}`}
                  hrefLang={l}
                  lang={l}
                  aria-label={localeMeta[l].name}
                  aria-current={l === lang ? "true" : undefined}
                  className={`flex min-h-9 items-center rounded-full px-3 text-[13px] font-semibold ${
                    l === lang ? "bg-accent text-ink" : "text-soft hover:text-white"
                  }`}
                >
                  {localeMeta[l].label}
                </Link>
              ))}
            </div>
            <Link href={`/${lang}/events`} className="rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-ink">
              {t.register}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
