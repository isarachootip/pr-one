import { company } from "@/data/site";
import type { Dict } from "@/i18n/dictionaries/en";

export function SiteFooter({ t }: { t: Dict["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-7 text-sm text-dim">
        <span>
          © {new Date().getFullYear()} {company.name} · {t.taxId} {company.taxId}
        </span>
        <span>{t.tagline}</span>
      </div>
    </footer>
  );
}
