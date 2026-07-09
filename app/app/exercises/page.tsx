import type { Metadata } from "next";
import { ExercisesLibrary } from "@/components/exercises/ExercisesLibrary";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ćwiczenia — Coach Zone",
};

export default async function ExercisesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  return <ExercisesLibrary categories={categories ?? []} />;
}
