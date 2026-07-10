import type { Metadata } from "next";
import Link from "next/link";
import { CategoryBadge } from "@/components/exercises/CategoryBadge";
import { SportBadge } from "@/components/exercises/SportBadge";
import { DifficultyIndicator } from "@/components/exercises/DifficultyIndicator";
import { DeleteExerciseButton } from "@/components/exercises/DeleteExerciseButton";
import { formatDuration } from "@/lib/exercises";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ćwiczenie — Coach Zone",
};

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: exercise, error: exerciseError }, { data: userData }] =
    await Promise.all([
      supabase.from("exercises").select("*").eq("id", id).maybeSingle(),
      supabase.auth.getUser(),
    ]);

  if (!exercise) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {exerciseError ? "Wystąpił błąd" : "Nie znaleziono ćwiczenia"}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {exerciseError
            ? "Nie udało się wczytać ćwiczenia. Spróbuj ponownie."
            : "To ćwiczenie nie istnieje albo nie masz do niego dostępu."}
        </p>
        <Link
          href={exerciseError ? `/app/exercises/${id}` : "/app/exercises"}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          {exerciseError ? "Spróbuj ponownie" : "Powrót do listy"}
        </Link>
      </main>
    );
  }

  const [{ data: category }, { data: sport }] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("id", exercise.category_id)
      .maybeSingle(),
    supabase
      .from("sports")
      .select("*")
      .eq("id", exercise.sport_id)
      .maybeSingle(),
  ]);

  const isOwner = userData.user?.id === exercise.author_id;

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <Link
        href="/app/exercises"
        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Wszystkie ćwiczenia
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {exercise.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {sport && <SportBadge name={sport.name_pl} />}
            {category && (
              <CategoryBadge name={category.name_pl} slug={category.slug} />
            )}
            <DifficultyIndicator difficulty={exercise.difficulty} showLabel />
            <span className="text-sm text-neutral-500 dark:text-neutral-500">
              {formatDuration(exercise.duration_min)}
            </span>
            {!exercise.is_public && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                Prywatne
              </span>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="flex shrink-0 gap-2">
            <Link
              href={`/app/exercises/${exercise.id}/edit`}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Edytuj
            </Link>
            <DeleteExerciseButton exerciseId={exercise.id} />
          </div>
        )}
      </div>

      {exercise.equipment.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {exercise.equipment.map((item) => (
            <span
              key={item}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {exercise.description && (
        <p className="mt-6 whitespace-pre-line text-neutral-700 dark:text-neutral-300">
          {exercise.description}
        </p>
      )}

      {exercise.steps.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Przebieg ćwiczenia</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
            {exercise.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {exercise.media_url && (
        <div className="mt-8">
          <a
            href={exercise.media_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Zobacz materiał →
          </a>
        </div>
      )}
    </main>
  );
}
