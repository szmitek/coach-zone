import Link from "next/link";
import type { Workout } from "@/lib/supabase/types";
import { formatCreatedDate, formatScheduledDate } from "@/lib/workouts";
import { DeleteWorkoutButton } from "./DeleteWorkoutButton";
import { DuplicateWorkoutButton } from "./DuplicateWorkoutButton";

export function WorkoutCard({
  workout,
  itemCount,
  onDeleted,
}: {
  workout: Workout;
  itemCount: number;
  onDeleted: () => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-emerald-600/50 dark:border-neutral-800">
      <Link
        href={`/app/workouts/${workout.id}`}
        className="flex-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
      >
        <h3 className="font-semibold tracking-tight">{workout.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
          {workout.team_name && <span>{workout.team_name}</span>}
          <span>{formatScheduledDate(workout.scheduled_for)}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500">
          <span>
            {itemCount} {itemCount === 1 ? "ćwiczenie" : "ćwiczeń"}
          </span>
          <span>Utworzono {formatCreatedDate(workout.created_at)}</span>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <DuplicateWorkoutButton workoutId={workout.id} />
        <DeleteWorkoutButton workoutId={workout.id} onDeleted={onDeleted} />
      </div>
    </div>
  );
}
