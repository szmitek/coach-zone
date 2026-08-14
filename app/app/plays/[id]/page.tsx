import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlayDetailHeader } from "@/components/plays/PlayDetailHeader";
import { PlayForm } from "@/components/plays/PlayForm";
import { canDeletePlay } from "@/lib/plays";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zagrywka — Coach Zone",
};

export default async function PlayEditPage({
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

  const [{ data: play, error: playError }, { data: teams }, { data: sports }] =
    await Promise.all([
      supabase.from("plays").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("teams")
        .select("id, name")
        .order("name", { ascending: true }),
      supabase.from("sports").select("*").order("id", { ascending: true }),
    ]);

  if (!play) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {playError ? "Wystąpił błąd" : "Nie znaleziono zagrywki"}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {playError
            ? "Nie udało się wczytać zagrywki. Spróbuj ponownie."
            : "Ta zagrywka nie istnieje albo nie masz do niej dostępu."}
        </p>
        <Link
          href={playError ? `/app/plays/${id}` : "/app/plays"}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          {playError ? "Spróbuj ponownie" : "Powrót do listy"}
        </Link>
      </main>
    );
  }

  // RLS (is_team_member) already scopes this to a team the caller belongs
  // to - only reachable at all when play.team_id is set, since that's the
  // only case canDeletePlay below needs a role for.
  const { data: membership } = play.team_id
    ? await supabase
        .from("team_members")
        .select("role")
        .eq("team_id", play.team_id)
        .eq("user_id", currentUserId)
        .maybeSingle()
    : { data: null };

  const canDelete = canDeletePlay({
    ownerId: play.owner_id,
    teamId: play.team_id,
    currentUserId,
    isHeadCoach: membership?.role === "head_coach",
  });

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <PlayDetailHeader
        playId={play.id}
        playName={play.name}
        canDelete={canDelete}
      />
      <div className="mt-8">
        <PlayForm
          mode="edit"
          play={play}
          currentUserId={currentUserId}
          teams={teams ?? []}
          sports={sports ?? []}
        />
      </div>
    </main>
  );
}
