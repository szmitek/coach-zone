import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ustawienia — Coach Zone",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("id", userData.user.id)
    .single();

  return (
    <main className="mx-auto max-w-md px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Ustawienia</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Zarządzaj swoim pseudonimem trenera.
      </p>
      <div className="mt-8">
        <ProfileSettingsForm
          userId={userData.user.id}
          currentPseudonym={profile?.display_name ?? ""}
        />
      </div>
    </main>
  );
}
