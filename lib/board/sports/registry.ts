import { americanFootballConfig } from "./americanFootball";
import { fallbackConfig } from "./fallback";
import { footballConfig } from "./football";
import type { SportBoardConfig } from "./types";

const configsBySlug: Record<string, SportBoardConfig> = {
  [footballConfig.slug]: footballConfig,
  [americanFootballConfig.slug]: americanFootballConfig,
};

/**
 * Looks up the board config for a sport slug. Unknown or missing slugs
 * (a sport row without a dedicated config yet, or no sport selected at
 * all) fall back to a generic field + tool set instead of crashing.
 */
export function getSportConfig(slug: string | null | undefined): SportBoardConfig {
  if (slug && slug in configsBySlug) return configsBySlug[slug];
  return fallbackConfig;
}
