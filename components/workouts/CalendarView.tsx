"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Workout } from "@/lib/supabase/types";
import { summarizeWorkoutItems, type WorkoutStats } from "@/lib/workouts";
import {
  addWeeks,
  formatWeekRangeLabel,
  getWeekDays,
  getWeekStart,
  isSameDay,
  toDateKey,
} from "@/lib/calendar";
import { CalendarDayCard } from "./CalendarDayCard";
import { UnscheduledWorkoutCard } from "./UnscheduledWorkoutCard";
import { WorkoutCardSkeleton } from "./WorkoutCardSkeleton";

export function CalendarView() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [stats, setStats] = useState<Record<string, WorkoutStats>>({});
  const [loadError, setLoadError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));

  useEffect(() => {
    let cancelled = false;
    setWorkouts(null);
    setLoadError(false);

    const supabase = createClient();

    async function load() {
      const { data: workoutsData, error: workoutsError } = await supabase
        .from("workouts")
        .select("*")
        .order("created_at", { ascending: true });

      if (cancelled) return;
      if (workoutsError || !workoutsData) {
        setLoadError(true);
        return;
      }

      const ids = workoutsData.map((workout) => workout.id);
      const { data: itemsData, error: itemsError } =
        ids.length > 0
          ? await supabase
              .from("workout_items")
              .select("workout_id, duration_min")
              .in("workout_id", ids)
          : { data: [], error: null };

      if (cancelled) return;
      if (itemsError) {
        setLoadError(true);
        return;
      }

      setStats(summarizeWorkoutItems(itemsData ?? []));
      setWorkouts(workoutsData);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const today = useMemo(() => new Date(), []);
  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const workoutsByDate = useMemo(() => {
    const map = new Map<string, Workout[]>();
    for (const workout of workouts ?? []) {
      if (!workout.scheduled_for) continue;
      const list = map.get(workout.scheduled_for) ?? [];
      list.push(workout);
      map.set(workout.scheduled_for, list);
    }
    return map;
  }, [workouts]);

  const unscheduled = useMemo(
    () => (workouts ?? []).filter((workout) => !workout.scheduled_for),
    [workouts],
  );

  function handleDateAssigned(workoutId: string, newDate: string) {
    setWorkouts(
      (prev) =>
        prev?.map((workout) =>
          workout.id === workoutId
            ? { ...workout, scheduled_for: newDate }
            : workout,
        ) ?? prev,
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Kalendarz treningów
          </h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            {formatWeekRangeLabel(weekStart)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/workouts"
            className="rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Lista treningów
          </Link>
          <Link
            href="/app/workouts/new"
            className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Nowy trening
          </Link>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setWeekStart((current) => addWeeks(current, -1))}
          aria-label="Poprzedni tydzień"
          className="rounded-full border border-neutral-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          ← Poprzedni
        </button>
        <button
          type="button"
          onClick={() => setWeekStart(getWeekStart(new Date()))}
          className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Dziś
        </button>
        <button
          type="button"
          onClick={() => setWeekStart((current) => addWeeks(current, 1))}
          aria-label="Następny tydzień"
          className="rounded-full border border-neutral-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Następny →
        </button>
      </div>

      <div className="mt-6">
        {loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/40">
            <p className="text-sm text-red-700 dark:text-red-400">
              Nie udało się wczytać treningów. Spróbuj ponownie.
            </p>
            <button
              type="button"
              onClick={() => setReloadToken((n) => n + 1)}
              className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Spróbuj ponownie
            </button>
          </div>
        ) : workouts === null ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {Array.from({ length: 7 }, (_, i) => (
              <WorkoutCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {weekDays.map((date) => (
              <CalendarDayCard
                key={toDateKey(date)}
                date={date}
                workouts={workoutsByDate.get(toDateKey(date)) ?? []}
                stats={stats}
                isToday={isSameDay(date, today)}
              />
            ))}
          </div>
        )}
      </div>

      {workouts !== null && !loadError && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Bez terminu
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Treningi bez przypisanej daty — nadaj datę, aby pojawiły się w
            kalendarzu.
          </p>
          <div className="mt-4">
            {unscheduled.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Wszystkie treningi mają przypisaną datę.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unscheduled.map((workout) => (
                  <UnscheduledWorkoutCard
                    key={workout.id}
                    workout={workout}
                    stats={stats[workout.id]}
                    onDateAssigned={handleDateAssigned}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
