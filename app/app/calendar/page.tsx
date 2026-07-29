import type { Metadata } from "next";
import { CalendarView } from "@/components/workouts/CalendarView";
import { resolveActiveTeamId } from "@/lib/teams";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kalendarz — Coach Zone",
};

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

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

  return <CalendarView activeTeamId={activeTeamId} />;
}
