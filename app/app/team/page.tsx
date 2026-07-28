import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TeamManager } from "@/components/team/TeamManager";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moja drużyna — Coach Zone",
};

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback, matching the other /app pages.
  if (!userData.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Moja drużyna</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Zarządzaj sztabem szkoleniowym i zapraszaj asystentów do wspólnej
        biblioteki ćwiczeń oraz planów treningowych.
      </p>
      <div className="mt-8">
        <TeamManager userId={userData.user.id} />
      </div>
    </main>
  );
}
