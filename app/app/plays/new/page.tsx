import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlayForm } from "@/components/plays/PlayForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nowa zagrywka — Coach Zone",
};

export default async function NewPlayPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback since userId below is required for the insert.
  if (!userData.user) {
    redirect("/login");
  }

  // RLS (is_team_member) already scopes this to the coach's own teams - the
  // scope selector below only ever needs to offer teams they belong to.
  const [{ data: teams }, { data: sports }] = await Promise.all([
    supabase
      .from("teams")
      .select("id, name")
      .order("name", { ascending: true }),
    supabase.from("sports").select("*").order("id", { ascending: true }),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Nowa zagrywka</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Numer zagrywki zostanie nadany automatycznie po zapisaniu — diagram
        możesz dodać teraz albo później.
      </p>
      <div className="mt-8">
        <PlayForm
          mode="create"
          userId={userData.user.id}
          teams={teams ?? []}
          sports={sports ?? []}
        />
      </div>
    </main>
  );
}
