import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { OnboardingOverlay } from "@/components/onboarding/OnboardingOverlay";
import { TeamSwitcher } from "@/components/team/TeamSwitcher";
import { createClient } from "@/lib/supabase/server";
import type { TeamRole } from "@/lib/supabase/types";
import { logout } from "./actions";

const navItems = [
  { href: "/app/exercises", label: "Ćwiczenia" },
  { href: "/app/workouts", label: "Treningi" },
  { href: "/app/calendar", label: "Kalendarz" },
  { href: "/app/team", label: "Drużyna" },
  { href: "/app/settings", label: "Ustawienia" },
];

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  let activeTeamId: string | null = null;
  let onboardingCompleted = true;
  let myTeams: Array<{
    id: string;
    name: string;
    short_name: string;
    role: TeamRole;
  }> = [];

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback matching the other /app pages.
  if (userData.user) {
    const [{ data: profile }, { data: teams }, { data: memberships }] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("active_team_id, onboarding_completed")
          .eq("id", userData.user.id)
          .single(),
        supabase.from("teams").select("id, name, short_name"),
        supabase
          .from("team_members")
          .select("team_id, role")
          .eq("user_id", userData.user.id),
      ]);

    activeTeamId = profile?.active_team_id ?? null;
    onboardingCompleted = profile?.onboarding_completed ?? true;

    const teamsById = new Map((teams ?? []).map((team) => [team.id, team]));
    myTeams = (memberships ?? []).flatMap((membership) => {
      const team = teamsById.get(membership.team_id);
      return team ? [{ ...team, role: membership.role }] : [];
    });
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Fires on first entry to anything under /app, whatever route the
          coach arrives on (e.g. straight to /app/team via an invite link) -
          not just the home page, which they might never visit first. */}
      {userData.user && !onboardingCompleted && <OnboardingOverlay />}

      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-8">
            <Link href="/app" className="shrink-0">
              {/* The wordmark and the switcher compete for space on a narrow
                  viewport - collapse to the mark alone below sm, keeping the
                  switcher room, rather than shrinking/wrapping the switcher. */}
              <span className="hidden sm:inline-flex">
                <Logo />
              </span>
              <span className="sm:hidden">
                <Logo variant="mark" />
              </span>
            </Link>
            {userData.user && (
              <TeamSwitcher
                userId={userData.user.id}
                teams={myTeams}
                activeTeamId={activeTeamId}
              />
            )}
            <nav className="flex gap-3 sm:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900 sm:px-4 sm:py-2"
            >
              Wyloguj się
            </button>
          </form>
        </div>
      </header>

      {children}
    </div>
  );
}
