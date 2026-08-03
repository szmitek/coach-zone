import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { WorkoutBuilder } from "@/components/workouts/WorkoutBuilder";
import type { Exercise } from "@/lib/supabase/types";
import { canDeleteWorkout } from "@/lib/workouts";
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

  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback, matching the other /app pages. currentUserId below
  // has to be a real id - it's written as last_edited_by on every save.
  if (!userData.user) {
    redirect("/login");
  }
  const currentUserId = userData.user.id;

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
  // RLS (is_team_member) already scopes this to a team the caller belongs
  // to - only reachable at all when workout.team_id is set, since that's
  // the only case canDeleteWorkout below needs a role for.
  const [{ data: exercises }, { data: membership }] = await Promise.all([
    exerciseIds.length > 0
      ? supabase.from("exercises").select("*").in("id", exerciseIds)
      : Promise.resolve({ data: [] as Exercise[] }),
    workout.team_id
      ? supabase
          .from("team_members")
          .select("role")
          .eq("team_id", workout.team_id)
          .eq("user_id", currentUserId)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const exercisesById = Object.fromEntries(
    (exercises ?? []).map((exercise) => [exercise.id, exercise]),
  );

  const canDelete = canDeleteWorkout({
    ownerId: workout.owner_id,
    teamId: workout.team_id,
    currentUserId,
    isHeadCoach: membership?.role === "head_coach",
  });

  return (
    <WorkoutBuilder
      initialWorkout={workout}
      initialItems={items ?? []}
      initialExercisesById={exercisesById}
      categories={categories ?? []}
      currentUserId={currentUserId}
      canDelete={canDelete}
    />
  );
}
