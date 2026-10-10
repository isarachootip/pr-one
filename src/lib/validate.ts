import { isLocale, defaultLocale } from "@/i18n/config";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const clean = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const isEmail = (v: string) => EMAIL.test(v) && v.length <= 200;
export const localeOf = (v: unknown) => (typeof v === "string" && isLocale(v) ? v : defaultLocale);
/** Bots fill the hidden "website" field. */
export const isBot = (body: Record<string, unknown>) => typeof body.website === "string" && body.website.trim() !== "";
