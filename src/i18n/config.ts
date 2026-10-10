export const locales = ["th", "en", "zh", "vi", "de", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export const localeMeta: Record<Locale, { label: string; name: string; intl: string; dir: "ltr" | "rtl" }> = {
  th: { label: "ไทย", name: "ภาษาไทย", intl: "th-TH", dir: "ltr" },
  en: { label: "EN", name: "English", intl: "en-GB", dir: "ltr" },
  zh: { label: "中文", name: "中文", intl: "zh-CN", dir: "ltr" },
  vi: { label: "VI", name: "Tiếng Việt", intl: "vi-VN", dir: "ltr" },
  de: { label: "DE", name: "Deutsch", intl: "de-DE", dir: "ltr" },
  ar: { label: "عربي", name: "العربية", intl: "ar", dir: "rtl" },
};

export const isLocale = (v: string | undefined | null): v is Locale => !!v && (locales as readonly string[]).includes(v);

/** Pick the best locale from an Accept-Language header. */
export function matchLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const prefs = header
    .split(",")
    .map((p) => {
      const [tag, q] = p.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const p of prefs) if (isLocale(p.base)) return p.base;
  return defaultLocale;
}

/** Fill {placeholders} in a translated string. */
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
