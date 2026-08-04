import type { Locale } from "./locales";

export type Dictionary = { [key: string]: string };

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  es: () => import("../../messages/es.json"),
  en: () => import("../../messages/en.json"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await dictionaries[locale]()).default;
}
