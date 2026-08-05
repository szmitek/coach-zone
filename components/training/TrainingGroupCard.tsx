import type { TrainingGroup } from "@/lib/trainingMode";
import { PositionPillRow } from "./PositionPill";

export function TrainingGroupCard({
  group,
  onOpen,
}: {
  group: TrainingGroup;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left transition-colors active:bg-white/10"
    >
      <span className="min-w-0">
        <PositionPillRow
          codes={group.positions.map((position) => position.code)}
        />
        <span className="mt-1.5 block truncate text-lg font-semibold text-white">
          {group.exercise.title}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-neutral-400">
        {group.durationMin !== null && (
          <span className="text-sm font-medium tabular-nums">
            {group.durationMin} min
          </span>
        )}
        <ChevronIcon />
      </span>
    </button>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
