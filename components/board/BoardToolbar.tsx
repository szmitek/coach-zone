"use client";

import type { ReactNode } from "react";
import type { ActiveTool, PitchMode } from "@/lib/board/types";
import {
  BallIcon,
  ConeIcon,
  OpponentIcon,
  PassLineIcon,
  PlayerIcon,
  RedoIcon,
  RunArrowIcon,
  SelectIcon,
  TrashIcon,
  UndoIcon,
} from "./icons";

const TOOLS: { id: ActiveTool; label: string; icon: ReactNode }[] = [
  { id: "select", label: "Wskaźnik", icon: <SelectIcon /> },
  { id: "player", label: "Zawodnik", icon: <PlayerIcon /> },
  { id: "opponent", label: "Przeciwnik", icon: <OpponentIcon /> },
  { id: "ball", label: "Piłka", icon: <BallIcon /> },
  { id: "cone", label: "Pachołek", icon: <ConeIcon /> },
  { id: "arrow", label: "Strzałka ruchu", icon: <RunArrowIcon /> },
  { id: "passLine", label: "Linia podania", icon: <PassLineIcon /> },
];

interface BoardToolbarProps {
  activeTool: ActiveTool;
  onToolChange: (tool: ActiveTool) => void;
  pitchMode: PitchMode;
  onPitchModeChange: (mode: PitchMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  hasSelection: boolean;
  onDeleteSelected: () => void;
}

export function BoardToolbar({
  activeTool,
  onToolChange,
  pitchMode,
  onPitchModeChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  hasSelection,
  onDeleteSelected,
}: BoardToolbarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex overflow-hidden rounded-full border border-neutral-300 text-sm dark:border-neutral-700">
          <button
            type="button"
            onClick={() => onPitchModeChange("full")}
            aria-pressed={pitchMode === "full"}
            className={`px-3 py-1.5 font-medium transition-colors ${
              pitchMode === "full"
                ? "bg-emerald-600 text-white"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
          >
            Pełne boisko
          </button>
          <button
            type="button"
            onClick={() => onPitchModeChange("half")}
            aria-pressed={pitchMode === "half"}
            className={`px-3 py-1.5 font-medium transition-colors ${
              pitchMode === "half"
                ? "bg-emerald-600 text-white"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
          >
            Połowa boiska
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Cofnij"
            title="Cofnij"
            className="rounded-full border border-neutral-300 p-2 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <UndoIcon />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Ponów"
            title="Ponów"
            className="rounded-full border border-neutral-300 p-2 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <RedoIcon />
          </button>
          <button
            type="button"
            onClick={onDeleteSelected}
            disabled={!hasSelection}
            aria-label="Usuń zaznaczony element"
            title="Usuń zaznaczony element"
            className="rounded-full border border-neutral-300 p-2 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <TrashIcon />
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-neutral-700 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Wyczyść
          </button>
        </div>
      </div>

      <div className="flex snap-x gap-2 overflow-x-auto pb-1">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => onToolChange(tool.id)}
            aria-pressed={activeTool === tool.id}
            className={`flex shrink-0 snap-start flex-col items-center gap-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
              activeTool === tool.id
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "border-transparent text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {tool.icon}
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}
