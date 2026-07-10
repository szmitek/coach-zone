"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Workout } from "@/lib/supabase/types";
import { formatTotalDuration, type WorkoutStats } from "@/lib/workouts";

export function UnscheduledWorkoutCard({
  workout,
  stats,
  onDateAssigned,
}: {
  workout: Workout;
  stats?: WorkoutStats;
  onDateAssigned: (workoutId: string, date: string) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const workoutStats = stats ?? { itemCount: 0, totalMinutes: 0 };

  async function handleDateChange(value: string) {
    if (!value) return;
    setSaving(true);
    setError(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("workouts")
      .update({ scheduled_for: value })
      .eq("id", workout.id);

    setSaving(false);
    if (error) {
      setError(true);
      return;
    }
    onDateAssigned(workout.id, value);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <Link
        href={`/app/workouts/${workout.id}`}
        className="flex-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
      >
        <h3 className="font-semibold tracking-tight">{workout.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500">
          {workout.team_name && <span>{workout.team_name}</span>}
          <span>
            {workoutStats.itemCount}{" "}
            {workoutStats.itemCount === 1 ? "ćwiczenie" : "ćwiczeń"}
          </span>
          <span>{formatTotalDuration(workoutStats.totalMinutes)}</span>
        </div>
      </Link>

      <div className="mt-3 flex items-center gap-2">
        <label
          htmlFor={`schedule-${workout.id}`}
          className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
        >
          Ustaw datę
        </label>
        <input
          id={`schedule-${workout.id}`}
          type="date"
          disabled={saving}
          defaultValue=""
          onChange={(e) => handleDateChange(e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-2 py-1 text-xs outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          Nie udało się zapisać daty. Spróbuj ponownie.
        </p>
      )}
    </div>
  );
}
