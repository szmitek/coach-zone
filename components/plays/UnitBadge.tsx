import type { PlayUnit } from "@/lib/supabase/types";
import { UNIT_LABELS } from "@/lib/plays";

// Mirrors the board's own offense (blue) / defense (red) tool-icon colors
// (lib/board/sports/americanFootball.tsx) so the badge reads consistently
// with the diagram itself; special teams gets a third, neutral color since
// it has no board equivalent.
const UNIT_CLASSES: Record<PlayUnit, string> = {
  offense:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400",
  defense:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
  special_teams:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-400",
};

export function UnitBadge({ unit }: { unit: PlayUnit }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${UNIT_CLASSES[unit]}`}
    >
      {UNIT_LABELS[unit]}
    </span>
  );
}
