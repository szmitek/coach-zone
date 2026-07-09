import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ExerciseForm } from "@/components/exercises/ExerciseForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nowe ćwiczenie — Coach Zone",
};

export default async function NewExercisePage() {
  const supabase = await createClient();
  const [{ data: userData }, { data: categories }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("categories").select("*").order("id", { ascending: true }),
  ]);

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback since userId below is required for the insert.
  if (!userData.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Nowe ćwiczenie</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Dodaj własne ćwiczenie do swojej biblioteki.
      </p>
      <div className="mt-8">
        <ExerciseForm
          mode="create"
          categories={categories ?? []}
          userId={userData.user.id}
        />
      </div>
    </main>
  );
}
