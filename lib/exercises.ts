import type { Difficulty } from "@/lib/supabase/types";

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Bardzo łatwy",
  2: "Łatwy",
  3: "Średni",
  4: "Trudny",
  5: "Bardzo trudny",
};

export const DIFFICULTY_OPTIONS: Difficulty[] = [1, 2, 3, 4, 5];

// Keyed by category slug, with a neutral fallback for anything unrecognized.
const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  warmup:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400",
  technical:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400",
  positional:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/50 dark:bg-violet-950/40 dark:text-violet-400",
  ssg: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400",
  strength:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
  cooldown:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/50 dark:bg-cyan-950/40 dark:text-cyan-400",
};

const FALLBACK_BADGE_CLASSES =
  "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300";

export function categoryBadgeClasses(slug: string): string {
  return CATEGORY_BADGE_CLASSES[slug] ?? FALLBACK_BADGE_CLASSES;
}

export function formatDuration(minutes: number | null): string {
  return minutes ? `${minutes} min` : "—";
}
