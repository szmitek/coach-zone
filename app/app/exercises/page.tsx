import type { Metadata } from "next";
import { ExercisesLibrary } from "@/components/exercises/ExercisesLibrary";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ćwiczenia — Coach Zone",
};

export default async function ExercisesPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: sports }, { data: userData }] =
    await Promise.all([
      supabase.from("categories").select("*").order("id", { ascending: true }),
      supabase.from("sports").select("*").order("id", { ascending: true }),
      supabase.auth.getUser(),
    ]);

  return (
    <ExercisesLibrary
      categories={categories ?? []}
      sports={sports ?? []}
      currentUserId={userData.user?.id ?? null}
    />
  );
}
