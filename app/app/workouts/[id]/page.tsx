import type { Metadata } from "next";
import Link from "next/link";
import { WorkoutBuilder } from "@/components/workouts/WorkoutBuilder";
import type { Exercise } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trening — Coach Zone",
};

export default async function WorkoutBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: workout, error: workoutError },
    { data: items },
    { data: categories },
  ] = await Promise.all([
    supabase.from("workouts").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("workout_items")
      .select("*")
      .eq("workout_id", id)
      .order("position", { ascending: true }),
    supabase.from("categories").select("*").order("id", { ascending: true }),
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
          href={workoutError ? `/app/workouts/${id}` : "/app/workouts"}
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
  const { data: exercises } =
    exerciseIds.length > 0
      ? await supabase.from("exercises").select("*").in("id", exerciseIds)
      : { data: [] as Exercise[] };

  const exercisesById = Object.fromEntries(
    (exercises ?? []).map((exercise) => [exercise.id, exercise]),
  );

  return (
    <WorkoutBuilder
      initialWorkout={workout}
      initialItems={items ?? []}
      initialExercisesById={exercisesById}
      categories={categories ?? []}
    />
  );
}
