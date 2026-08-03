import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CreateTeamForm } from "@/components/team/CreateTeamForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nowa drużyna — Coach Zone",
};

export default async function NewTeamPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback since userId below is required for the insert.
  if (!userData.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Nowa drużyna</h1>
      <div className="mt-8 max-w-md">
        <CreateTeamForm userId={userData.user.id} />
      </div>
    </main>
  );
}
