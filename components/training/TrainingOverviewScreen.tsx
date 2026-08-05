"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatCountdown,
  type TrainingBlock,
  type TrainingSection,
} from "@/lib/trainingMode";
import { armTrainingSignal, fireTrainingSignal } from "./trainingSignal";
import { TrainingGroupCard } from "./TrainingGroupCard";
import { useTrainingTimer } from "./useTrainingTimer";

// Screen 1: one shared timer for the whole block (not per group - the
// slowest group is what everyone waits on), the block's parallel groups as
// tap targets below it, and one button that advances every group together.
export function TrainingOverviewScreen({
  workoutId,
  section,
  sectionIndex,
  totalSections,
  block,
  blockIndex,
  totalBlocks,
  blockKey,
  onOpenGroup,
  onNext,
}: {
  workoutId: string;
  section: TrainingSection;
  sectionIndex: number;
  totalSections: number;
  block: TrainingBlock;
  blockIndex: number;
  totalBlocks: number;
  blockKey: string;
  onOpenGroup: (key: string) => void;
  onNext: () => void;
}) {
  const { status, remainingMs, durationMin, start, setMinutes } =
    useTrainingTimer(blockKey, block.suggestedDurationMin, fireTrainingSignal);
  const [editing, setEditing] = useState(false);
  const [draftMinutes, setDraftMinutes] = useState(String(durationMin));

  function openEditor() {
    if (status !== "idle") return;
    setDraftMinutes(String(durationMin));
    setEditing(true);
  }

  function commitDraft() {
    const parsed = Math.round(Number(draftMinutes));
    if (Number.isFinite(parsed) && parsed > 0) setMinutes(parsed);
    setEditing(false);
  }

  function handleStart() {
    armTrainingSignal();
    start();
  }

  function handlePrzerwa() {
    armTrainingSignal();
    fireTrainingSignal();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-neutral-950 text-white">
      <header className="flex items-center justify-between gap-3 px-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <Link
          href={`/app/workouts/${workoutId}`}
          aria-label="Zakończ tryb treningu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-neutral-400 hover:bg-white/10 hover:text-white active:bg-white/10"
        >
          ×
        </Link>
        <div className="min-w-0 text-center">
          <p className="text-sm font-semibold text-neutral-400">
            Sekcja {sectionIndex + 1} z {totalSections}
          </p>
          <h1 className="truncate text-lg font-bold tracking-tight">
            {section.label}
          </h1>
        </div>
        <div className="w-11 shrink-0" aria-hidden="true" />
      </header>

      <p className="mt-1 text-center text-sm font-medium text-neutral-500">
        Ćwiczenie {blockIndex + 1} z {totalBlocks}
      </p>

      <div className="mt-6 flex flex-col items-center px-5">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              autoFocus
              value={draftMinutes}
              onChange={(e) => setDraftMinutes(e.target.value)}
              onBlur={commitDraft}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitDraft();
              }}
              aria-label="Czas bloku w minutach"
              className="w-40 rounded-2xl border border-white/25 bg-white/10 py-3 text-center font-mono text-6xl font-bold tabular-nums text-white outline-none focus:border-emerald-400"
            />
            <button
              type="button"
              onClick={commitDraft}
              className="rounded-full bg-emerald-500 px-4 py-3 text-base font-bold text-neutral-950 active:bg-emerald-400"
            >
              Gotowe
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={openEditor}
            disabled={status !== "idle"}
            aria-label="Ustaw czas bloku"
            className={`font-mono text-7xl font-bold tabular-nums transition-colors sm:text-8xl ${
              status === "completed" ? "text-amber-400" : "text-white"
            }`}
          >
            {formatCountdown(remainingMs)}
          </button>
        )}

        <div className="mt-2 h-6" role="status" aria-live="polite">
          {status === "completed" && (
            <p className="animate-pulse text-lg font-semibold text-amber-400">
              Czas minął!
            </p>
          )}
          {status === "idle" && !editing && (
            <p className="text-sm text-neutral-500">
              Stuknij czas, aby go zmienić
            </p>
          )}
        </div>

        <div className="mt-4 flex w-full max-w-sm gap-3">
          {status === "idle" && (
            <button
              type="button"
              onClick={handleStart}
              className="flex-1 rounded-2xl bg-emerald-500 py-4 text-xl font-bold text-neutral-950 transition-colors active:bg-emerald-400"
            >
              Start
            </button>
          )}
          <button
            type="button"
            onClick={handlePrzerwa}
            className="flex-1 rounded-2xl border-2 border-white/30 py-4 text-xl font-bold text-white transition-colors active:bg-white/10"
          >
            Przerwa
          </button>
        </div>
      </div>

      <div className="mt-8 flex-1 space-y-3 px-5 pb-5">
        {block.groups.map((group) => (
          <TrainingGroupCard
            key={group.key}
            group={group}
            onOpen={() => onOpenGroup(group.key)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 border-t border-white/10 bg-neutral-950 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onNext}
          className="w-full rounded-2xl bg-white py-4 text-xl font-bold text-neutral-950 transition-colors active:bg-neutral-200"
        >
          Następne ćwiczenie →
        </button>
      </div>
    </div>
  );
}
