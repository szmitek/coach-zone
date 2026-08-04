"use client";

import { useState } from "react";
import { BoardViewLoader } from "@/components/board/BoardViewLoader";
import { boardElementsOf } from "@/lib/exercises";
import type { Exercise } from "@/lib/supabase/types";

// Collapsed-thumbnail bounding box. Both bounds matter - a wide field (e.g.
// American football's full 1200x520 board) would blow past a phone's width
// if it were only capped by height.
const THUMBNAIL_MAX_HEIGHT = 200;
const THUMBNAIL_MAX_WIDTH = 260;

// board_state is null for much of the library, so every section below is independently optional.
export function ExercisePreview({
  exercise,
  sportSlug,
}: {
  exercise: Exercise;
  sportSlug?: string | null;
}) {
  const [boardExpanded, setBoardExpanded] = useState(false);
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

  // Text is what answers "what is this and how do I run it" - it always
  // leads, with the diagram as supporting illustration rather than the
  // main event.
  const text = (
    <div className="min-w-0 flex-1 space-y-3">
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
    </div>
  );

  if (!boardElements || boardElements.length === 0) {
    return text;
  }

  return (
    <div
      className={
        boardExpanded
          ? "space-y-3"
          : "flex flex-col gap-3 sm:flex-row sm:items-start"
      }
    >
      {text}
      <button
        type="button"
        onClick={() => setBoardExpanded((expanded) => !expanded)}
        aria-expanded={boardExpanded}
        aria-label={boardExpanded ? "Zwiń diagram" : "Powiększ diagram"}
        className={
          boardExpanded
            ? "block w-full cursor-zoom-out rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
            : "group relative shrink-0 cursor-zoom-in self-start rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
        }
      >
        <BoardViewLoader
          sportSlug={sportSlug}
          fieldModeId={exercise.board_field_mode}
          elements={boardElements}
          maxWidth={boardExpanded ? undefined : THUMBNAIL_MAX_WIDTH}
          maxHeight={boardExpanded ? undefined : THUMBNAIL_MAX_HEIGHT}
        />
        {!boardExpanded && (
          <span className="pointer-events-none absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white transition-colors group-hover:bg-black/70">
            <ExpandIcon />
          </span>
        )}
      </button>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5V1h4M11 7v4H7M1 1l4 4M11 11l-4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
