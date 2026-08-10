"use client";

import { useState } from "react";
import { BoardViewLoader } from "@/components/board/BoardViewLoader";
import type { TrainingGroup } from "@/lib/trainingMode";
import { PositionPillRow } from "./PositionPill";

// Matches ExercisePreview's collapsed-thumbnail bounds, so tap-to-expand
// looks and behaves the same everywhere it shows up in the app.
const THUMBNAIL_MAX_HEIGHT = 200;
const THUMBNAIL_MAX_WIDTH = 260;

// Screen 2: how to set the drill out. No timer here on purpose - the block's
// countdown lives on the overview screen and keeps running underneath.
export function TrainingGroupDetailScreen({
  group,
  onBack,
}: {
  group: TrainingGroup;
  onBack: () => void;
}) {
  const [boardExpanded, setBoardExpanded] = useState(false);
  const { exercise } = group;
  const hasBoard =
    exercise.boardElements !== null && exercise.boardElements.length > 0;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col overflow-y-auto bg-neutral-950 text-white">
      <header className="flex items-center gap-3 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Powrót do przeglądu bloku"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-300 hover:bg-white/10 hover:text-white active:bg-white/10"
        >
          ←
        </button>
        <PositionPillRow
          codes={group.positions.map((position) => position.code)}
        />
      </header>

      <div className="flex-1 space-y-6 px-5 pt-3 pb-10">
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          {exercise.title}
        </h1>

        {hasBoard && (
          <button
            type="button"
            onClick={() => setBoardExpanded((expanded) => !expanded)}
            aria-expanded={boardExpanded}
            aria-label={boardExpanded ? "Zwiń diagram" : "Powiększ diagram"}
            className={
              boardExpanded
                ? "group relative block w-full cursor-zoom-out rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                : "group relative inline-block cursor-zoom-in rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            }
          >
            <BoardViewLoader
              sportSlug={exercise.sportSlug}
              fieldModeId={exercise.boardFieldMode}
              elements={exercise.boardElements!}
              maxWidth={boardExpanded ? undefined : THUMBNAIL_MAX_WIDTH}
              maxHeight={boardExpanded ? undefined : THUMBNAIL_MAX_HEIGHT}
            />
            <span className="pointer-events-none absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors group-hover:bg-black/80">
              {boardExpanded ? <CollapseIcon /> : <ExpandIcon />}
            </span>
          </button>
        )}

        {exercise.description && (
          <p className="whitespace-pre-line text-lg leading-relaxed text-neutral-200">
            {exercise.description}
          </p>
        )}

        {exercise.steps.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
              Przebieg ćwiczenia
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-lg leading-relaxed text-neutral-200">
              {exercise.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function CollapseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 1V5H1M11 7H7v4M1 1l4 4M11 11l-4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
