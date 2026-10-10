import { localeMeta, type Locale } from "@/i18n/config";

const TZ = "Asia/Bangkok";

export function formatDate(iso: string, locale: Locale, withTime = true) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(d);
}

/** "20 Nov 2026, 09:00–16:00" — collapses shared parts of a date range. */
export function formatRange(startIso: string, endIso: string, locale: Locale, withTime = true) {
  const f = new Intl.DateTimeFormat(localeMeta[locale].intl, {
    timeZone: TZ, day: "numeric", month: "short", year: "numeric", ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
  return f.formatRange(new Date(startIso), new Date(endIso));
}

/** "12 Nov 2026, 09:00" / year only / fallback text. */
export function eventDateLabel(e: { startsAt: string | null; year: number | null; isUpcoming: boolean }, locale: Locale, tbc: string) {
  if (e.startsAt) return formatDate(e.startsAt, locale, e.isUpcoming);
  if (e.year) return String(e.year);
  return tbc;
}

/** Google Calendar link for an event with a start date (4 hours long if no end date). */
export function calendarHref(e: { title: string; startsAt: string | null; endsAt: string | null; venue: string; summary: string }) {
  if (!e.startsAt) return null;
  const start = new Date(e.startsAt);
  const end = e.endsAt ? new Date(e.endsAt) : new Date(start.getTime() + 4 * 3600000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: e.title, dates: `${f(start)}/${f(end)}`, location: e.venue, details: e.summary });
  return `https://calendar.google.com/calendar/render?${q}`;
}
