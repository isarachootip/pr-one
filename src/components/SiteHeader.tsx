"use client";

import Link from "next/link";
import { asset, companyLogo, languages } from "@/data/site";
import { useCopy, useLang } from "./LangProvider";

const links = [
  ["Events", "/#events"],
  ["Roadmap", "/#roadmap"],
  ["Services", "/#services"],
  ["Clients", "/#clients"],
  ["Team", "/#team"],
  ["Connect", "/#connect"],
  ["Contact", "/#contact"],
];

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const t = useCopy();
  return (
    <header className="relative z-10 md:sticky md:top-0 border-b border-line bg-[rgba(11,15,23,0.92)] backdrop-blur">
      <nav className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-[-0.02em]">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(companyLogo)} alt="PR One Network" className="h-full w-full object-contain" />
          </span>
          <span className="leading-none">
            PR ONE
            <span className="mt-1 block font-mono text-[10px] font-normal tracking-[0.3em] text-dim">NETWORK</span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-soft">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="py-2.5 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Language" className="flex flex-wrap rounded-full border border-edge p-[3px]">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                aria-label={l.name}
                aria-pressed={lang === l.code}
                onClick={() => setLang(l.code)}
                className={`min-h-9 rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                  lang === l.code ? "bg-accent text-ink" : "text-soft hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link href="/#events" className="rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-ink">
            {t.navCta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
