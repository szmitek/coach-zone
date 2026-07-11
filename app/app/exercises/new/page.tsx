import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ExerciseForm } from "@/components/exercises/ExerciseForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nowe ćwiczenie — Coach Zone",
};

export default async function NewExercisePage({
  searchParams,
}: {
  searchParams: Promise<{ duplicateFrom?: string }>;
}) {
  const { duplicateFrom: duplicateFromId } = await searchParams;
  const supabase = await createClient();

  const [{ data: userData }, { data: categories }, { data: sports }] =
    await Promise.all([
      supabase.auth.getUser(),
      supabase.from("categories").select("*").order("id", { ascending: true }),
      supabase.from("sports").select("*").order("id", { ascending: true }),
    ]);

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback since userId below is required for the insert.
  if (!userData.user) {
    redirect("/login");
  }

  // RLS (public OR own) already scopes this select - if the id doesn't
  // resolve (deleted, or not visible to this coach), duplicateFrom stays
  // null and the form just falls back to a blank create.
  const { data: duplicateFrom } = duplicateFromId
    ? await supabase
        .from("exercises")
        .select("*")
        .eq("id", duplicateFromId)
        .maybeSingle()
    : { data: null };

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">
        {duplicateFrom ? "Duplikuj ćwiczenie" : "Nowe ćwiczenie"}
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        {duplicateFrom
          ? `Tworzysz nowe ćwiczenie na podstawie „${duplicateFrom.title}”. Zmień, co chcesz, i zapisz jako osobny wpis w bibliotece.`
          : "Dodaj własne ćwiczenie do swojej biblioteki."}
      </p>
      <div className="mt-8">
        <ExerciseForm
          categories={categories ?? []}
          sports={sports ?? []}
          userId={userData.user.id}
          duplicateFrom={duplicateFrom}
        />
      </div>
    </main>
  );
}
