import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TrainingMode } from "@/components/training/TrainingMode";
import { buildTrainingPlan } from "@/lib/trainingMode";
import type { Exercise, Position } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tryb treningu — Coach Zone",
};

export default async function TrainingModePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback, matching the other /app pages.
  if (!userData.user) {
    redirect("/login");
  }

  const [{ data: workout, error: workoutError }, { data: items }] =
    await Promise.all([
      supabase.from("workouts").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("workout_items")
        .select("*")
        .eq("workout_id", id)
        .order("position", { ascending: true }),
    ]);

  if (!workout) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {workoutError ? "Wystąpił błąd" : "Nie znaleziono treningu"}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {workoutError
            ? "Nie udało się wczytać treningu. Spróbuj ponownie."
            : "Ten trening nie istnieje albo nie masz do niego dostępu."}
        </p>
        <Link
          href={workoutError ? `/app/workouts/${id}/train` : "/app/workouts"}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          {workoutError ? "Spróbuj ponownie" : "Powrót do listy"}
        </Link>
      </main>
    );
  }

  const exerciseIds = Array.from(
    new Set((items ?? []).map((item) => item.exercise_id)),
  );

  // RLS already scopes `exercises` to what this coach can see (same query
  // WorkoutBuilderPage runs); positions/exercise_positions/sports are
  // readable by any authenticated user (see
  // supabase/migrations/20260727210405_exercise_scope_positions_and_sport_fix.sql
  // and 20260710100000_sports_and_exercise_sport_id.sql), so no team scoping
  // is needed for those three.
  const [{ data: exercises }, { data: exercisePositions }, { data: sports }] =
    await Promise.all([
      exerciseIds.length > 0
        ? supabase.from("exercises").select("*").in("id", exerciseIds)
        : Promise.resolve({ data: [] as Exercise[] }),
      exerciseIds.length > 0
        ? supabase
            .from("exercise_positions")
            .select("exercise_id, position_id")
            .in("exercise_id", exerciseIds)
        : Promise.resolve({
            data: [] as { exercise_id: string; position_id: string }[],
          }),
      supabase.from("sports").select("*"),
    ]);

  const positionIds = Array.from(
    new Set((exercisePositions ?? []).map((link) => link.position_id)),
  );
  const { data: positions } =
    positionIds.length > 0
      ? await supabase.from("positions").select("*").in("id", positionIds)
      : { data: [] as Position[] };

  const exercisesById = Object.fromEntries(
    (exercises ?? []).map((exercise) => [exercise.id, exercise]),
  );

  const positionsById = new Map(
    (positions ?? []).map((position) => [position.id, position]),
  );
  const positionsByExerciseId: Record<string, Position[]> = {};
  for (const link of exercisePositions ?? []) {
    const position = positionsById.get(link.position_id);
    if (!position) continue;
    (positionsByExerciseId[link.exercise_id] ??= []).push(position);
  }

  const sportSlugById = Object.fromEntries(
    (sports ?? []).map((sport) => [sport.id, sport.slug]),
  );

  const plan = buildTrainingPlan({
    items: items ?? [],
    exercisesById,
    positionsByExerciseId,
    sportSlugById,
  });

  return (
    <TrainingMode
      workoutId={workout.id}
      workoutTitle={workout.title}
      plan={plan}
    />
  );
}
