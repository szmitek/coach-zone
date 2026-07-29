import type { Metadata } from "next";
import { Suspense } from "react";
import { ExercisesLibrary } from "@/components/exercises/ExercisesLibrary";
import { resolveActiveTeamId } from "@/lib/teams";
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

  let activeTeamId: string | null = null;
  if (userData.user) {
    const [{ data: profile }, { data: teams }] = await Promise.all([
      supabase
        .from("profiles")
        .select("active_team_id")
        .eq("id", userData.user.id)
        .single(),
      supabase.from("teams").select("id"),
    ]);
    activeTeamId = resolveActiveTeamId(
      profile?.active_team_id ?? null,
      teams ?? [],
    );
  }

  return (
    <Suspense fallback={null}>
      <ExercisesLibrary
        categories={categories ?? []}
        sports={sports ?? []}
        currentUserId={userData.user?.id ?? null}
        activeTeamId={activeTeamId}
      />
    </Suspense>
  );
}
