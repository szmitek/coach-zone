import { americanFootballConfig } from "./americanFootball";
import { basketballConfig } from "./basketball";
import { fallbackConfig } from "./fallback";
import { footballConfig } from "./football";
import { handballConfig } from "./handball";
import { volleyballConfig } from "./volleyball";
import type { SportBoardConfig } from "./types";
import type { Sport } from "@/lib/supabase/types";

const configsBySlug: Record<string, SportBoardConfig> = {
  [footballConfig.slug]: footballConfig,
  [americanFootballConfig.slug]: americanFootballConfig,
  [basketballConfig.slug]: basketballConfig,
  [volleyballConfig.slug]: volleyballConfig,
  [handballConfig.slug]: handballConfig,
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

/**
 * Default sport for a board when nothing else picks one: prefer American
 * football (this app's primary sport), else the first sport row available.
 * Shared by the board itself and anything that needs to resolve a sport_id
 * without offering a picker (e.g. plays in phase 1).
 */
export function pickDefaultSportId(sports: Sport[]): number | null {
  const preferred = sports.find((s) => s.slug === "american_football");
  return preferred?.id ?? sports[0]?.id ?? null;
}
