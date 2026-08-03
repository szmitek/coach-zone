"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Workout } from "@/lib/supabase/types";
import { canDeleteWorkout } from "@/lib/workouts";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutCardSkeleton } from "./WorkoutCardSkeleton";

export function WorkoutsList() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [headCoachTeamIds, setHeadCoachTeamIds] = useState<Set<string>>(
    new Set(),
  );
  const [loadError, setLoadError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setWorkouts(null);
    setLoadError(false);

    const supabase = createClient();

    async function load() {
      const [{ data: userData }, { data: workoutsData, error: workoutsError }] =
        await Promise.all([
          supabase.auth.getUser(),
          supabase
            .from("workouts")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);

      if (cancelled) return;
      if (workoutsError || !workoutsData) {
        setLoadError(true);
        return;
      }
      setCurrentUserId(userData.user?.id ?? null);

      const ids = workoutsData.map((workout) => workout.id);
      const [{ data: itemsData, error: itemsError }, { data: membershipsData }] =
        await Promise.all([
          ids.length > 0
            ? supabase
                .from("workout_items")
                .select("workout_id")
                .in("workout_id", ids)
            : Promise.resolve({ data: [], error: null }),
          // RLS (is_team_member) already scopes this to teams the caller
          // belongs to - filtered to their own row so this is "which of my
          // teams am I head coach of", not a full roster fetch.
          userData.user
            ? supabase
                .from("team_members")
                .select("team_id, role")
                .eq("user_id", userData.user.id)
            : Promise.resolve({ data: [] }),
        ]);

      if (cancelled) return;
      if (itemsError) {
        setLoadError(true);
        return;
      }

      const counts: Record<string, number> = {};
      for (const item of itemsData ?? []) {
        counts[item.workout_id] = (counts[item.workout_id] ?? 0) + 1;
      }

      setItemCounts(counts);
      setHeadCoachTeamIds(
        new Set(
          (membershipsData ?? [])
            .filter((m) => m.role === "head_coach")
            .map((m) => m.team_id),
        ),
      );
      setWorkouts(workoutsData);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  function handleDeleted(id: string) {
    setWorkouts((prev) => prev?.filter((workout) => workout.id !== id) ?? prev);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Twoje treningi</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Planuj sesje treningowe i buduj je z biblioteki ćwiczeń.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/calendar"
            className="rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Kalendarz
          </Link>
          <Link
            href="/app/workouts/new"
            className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Nowy trening
          </Link>
        </div>
      </div>

      <div className="mt-8">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <WorkoutCardSkeleton key={i} />
            ))}
          </div>
        ) : workouts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400">
              Nie masz jeszcze żadnych treningów — utwórz pierwszy.
            </p>
            <Link
              href="/app/workouts/new"
              className="mt-3 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Utwórz pierwszy trening →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                itemCount={itemCounts[workout.id] ?? 0}
                canDelete={canDeleteWorkout({
                  ownerId: workout.owner_id,
                  teamId: workout.team_id,
                  currentUserId,
                  isHeadCoach:
                    workout.team_id !== null &&
                    headCoachTeamIds.has(workout.team_id),
                })}
                onDeleted={() => handleDeleted(workout.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
