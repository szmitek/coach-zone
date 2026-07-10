import Link from "next/link";
import type { Workout } from "@/lib/supabase/types";
import { formatTotalDuration, type WorkoutStats } from "@/lib/workouts";
import { formatDayLabel, toDateKey } from "@/lib/calendar";

export function CalendarDayCard({
  date,
  workouts,
  stats,
  isToday,
}: {
  date: Date;
  workouts: Workout[];
  stats: Record<string, WorkoutStats>;
  isToday: boolean;
}) {
  const dateKey = toDateKey(date);

  return (
    <div
      className={`flex flex-col rounded-2xl border p-4 ${
        isToday
          ? "border-emerald-600 bg-emerald-50/60 dark:border-emerald-500 dark:bg-emerald-950/20"
          : "border-neutral-200 dark:border-neutral-800"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm font-semibold ${
            isToday
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-neutral-900 dark:text-neutral-100"
          }`}
        >
          {formatDayLabel(date)}
        </span>
        {isToday && (
          <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            Dziś
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-2">
        {workouts.length === 0 ? (
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Brak treningów
          </p>
        ) : (
          workouts.map((workout) => {
            const workoutStats = stats[workout.id] ?? {
              itemCount: 0,
              totalMinutes: 0,
            };
            return (
              <Link
                key={workout.id}
                href={`/app/workouts/${workout.id}`}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:border-emerald-600/50 dark:border-neutral-800"
              >
                <div className="font-medium">{workout.title}</div>
                <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {workout.team_name && <span>{workout.team_name}</span>}
                  <span>
                    {workoutStats.itemCount}{" "}
                    {workoutStats.itemCount === 1 ? "ćwiczenie" : "ćwiczeń"}
                  </span>
                  <span>{formatTotalDuration(workoutStats.totalMinutes)}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <Link
        href={`/app/workouts/new?date=${dateKey}`}
        className="mt-3 rounded-full border border-dashed border-neutral-300 px-3 py-2 text-center text-xs font-medium text-neutral-500 transition-colors hover:border-emerald-600/50 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-600/50 dark:hover:text-emerald-400"
      >
        + Dodaj trening
      </Link>
    </div>
  );
}
