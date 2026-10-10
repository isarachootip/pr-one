import Link from "next/link";
import { headers } from "next/headers";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export default async function NotFound() {
  const h = await headers();
  const seg = (h.get("x-pr1-path") || "").split("/")[1];
  const lang = isLocale(seg) ? seg : defaultLocale;
  const t = await getDictionary(lang);
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <div className="font-mono text-accent">404</div>
        <h1 className="my-4 font-display text-5xl font-bold">{t.notFound.title}</h1>
        <Link href={`/${lang}`} className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-ink">
          {t.notFound.back}
        </Link>
      </div>
    </div>
  );
}
