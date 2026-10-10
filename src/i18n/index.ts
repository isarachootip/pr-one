import "server-only";
import type { Locale } from "./config";
import type { Dict } from "./dictionaries/en";

const loaders: Record<Locale, () => Promise<{ default: Dict }>> = {
  th: () => import("./dictionaries/th"),
  en: () => import("./dictionaries/en"),
  zh: () => import("./dictionaries/zh"),
  vi: () => import("./dictionaries/vi"),
  de: () => import("./dictionaries/de"),
  ar: () => import("./dictionaries/ar"),
};

export async function getDictionary(locale: Locale): Promise<Dict> {
  return (await loaders[locale]()).default;
}
export type { Dict };
