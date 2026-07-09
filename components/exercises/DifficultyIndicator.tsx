import type { Difficulty } from "@/lib/supabase/types";
import { DIFFICULTY_LABELS } from "@/lib/exercises";

export function DifficultyIndicator({
  difficulty,
  showLabel = false,
}: {
  difficulty: Difficulty | null;
  showLabel?: boolean;
}) {
  if (!difficulty) {
    return (
      <span className="text-sm text-neutral-500 dark:text-neutral-500">—</span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`Poziom trudności: ${DIFFICULTY_LABELS[difficulty]} (${difficulty}/5)`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i < difficulty
                ? "bg-emerald-600"
                : "bg-neutral-200 dark:bg-neutral-700"
            }`}
          />
        ))}
      </span>
      {showLabel && (
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {DIFFICULTY_LABELS[difficulty]}
        </span>
      )}
    </span>
  );
}
