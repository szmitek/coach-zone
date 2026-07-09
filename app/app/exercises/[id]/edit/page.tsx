import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExerciseForm } from "@/components/exercises/ExerciseForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edytuj ćwiczenie — Coach Zone",
};

export default async function EditExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: exercise }, { data: userData }, { data: categories }] =
    await Promise.all([
      supabase.from("exercises").select("*").eq("id", id).maybeSingle(),
      supabase.auth.getUser(),
      supabase.from("categories").select("*").order("id", { ascending: true }),
    ]);

  if (!userData.user) {
    redirect("/login");
  }

  if (!exercise) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Nie znaleziono ćwiczenia
        </h1>
        <Link
          href="/app/exercises"
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Powrót do listy
        </Link>
      </main>
    );
  }

  if (exercise.author_id !== userData.user.id) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Brak dostępu</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Możesz edytować tylko własne ćwiczenia.
        </p>
        <Link
          href={`/app/exercises/${exercise.id}`}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Powrót do ćwiczenia
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Edytuj ćwiczenie</h1>
      <div className="mt-8">
        <ExerciseForm
          mode="edit"
          categories={categories ?? []}
          exercise={exercise}
        />
      </div>
    </main>
  );
}
