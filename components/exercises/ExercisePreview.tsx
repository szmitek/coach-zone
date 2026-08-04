import { BoardViewLoader } from "@/components/board/BoardViewLoader";
import { boardElementsOf } from "@/lib/exercises";
import type { Exercise } from "@/lib/supabase/types";

// board_state is null for much of the library, so every section below is independently optional.
export function ExercisePreview({
  exercise,
  sportSlug,
}: {
  exercise: Exercise;
  sportSlug?: string | null;
}) {
  const boardElements = boardElementsOf(exercise);
  const hasBoard = boardElements !== null && boardElements.length > 0;
  const hasEquipment = exercise.equipment.length > 0;
  const hasSteps = exercise.steps.length > 0;

  if (!hasBoard && !hasEquipment && !exercise.description && !hasSteps) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        Brak dodatkowych informacji.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {boardElements && boardElements.length > 0 && (
        <BoardViewLoader
          sportSlug={sportSlug}
          fieldModeId={exercise.board_field_mode}
          elements={boardElements}
        />
      )}

      {hasEquipment && (
        <div className="flex flex-wrap gap-1.5">
          {exercise.equipment.map((item) => (
            <span
              key={item}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {exercise.description && (
        <p className="whitespace-pre-line text-sm text-neutral-700 dark:text-neutral-300">
          {exercise.description}
        </p>
      )}

      {hasSteps && (
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-500">
            Przebieg ćwiczenia
          </p>
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
            {exercise.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
