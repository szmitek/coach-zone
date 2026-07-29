"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { TeamRole } from "@/lib/supabase/types";
import { ROLE_LABELS, resolveActiveTeamId } from "@/lib/teams";

interface SwitcherTeam {
  id: string;
  name: string;
  short_name: string;
  role: TeamRole;
}

const badgeClasses =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900";

function ActiveDot() {
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
    />
  );
}

// Lives to the right of the logo lockup in the app header. Three states:
// no team (an affordance, not an error - the app works fine without one),
// exactly one team (a badge with nothing to switch to, so no chevron), and
// several (a dropdown). Writes profiles.active_team_id directly - it's
// already owner-only via RLS, no new permission needed - and persists
// server-side on purpose: a coach opening the app on their phone at the
// training ground should already be in the right team's context.
export function TeamSwitcher({
  userId,
  teams,
  activeTeamId,
}: {
  userId: string;
  teams: SwitcherTeam[];
  activeTeamId: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Optimistic: updated immediately on click, resynced whenever the server
  // value changes (e.g. after router.refresh()). The write still happens in
  // the background - same "don't make the coach wait on a round trip"
  // pattern as OnboardingOverlay's dismissal.
  const [displayedActiveId, setDisplayedActiveId] = useState(activeTeamId);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [switchError, setSwitchError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedActiveId(activeTeamId);
  }, [activeTeamId]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const effectiveActiveId = resolveActiveTeamId(displayedActiveId, teams);

  async function handleSelect(team: SwitcherTeam) {
    setOpen(false);
    if (team.id === effectiveActiveId) return;

    setDisplayedActiveId(team.id);
    setSwitchError(false);
    // Switching changes what the whole app shows, which is a large
    // consequence for a small click - surface a brief confirmation rather
    // than letting the content silently swap underneath the coach.
    const message = `Przełączono na ${team.short_name}`;
    setConfirmation(message);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ active_team_id: team.id })
      .eq("id", userId);

    if (error) {
      setDisplayedActiveId(activeTeamId);
      setConfirmation(null);
      setSwitchError(true);
      return;
    }

    router.refresh();
    setTimeout(() => {
      setConfirmation((current) => (current === message ? null : current));
    }, 2500);
  }

  if (teams.length === 0) {
    return (
      <Link
        href="/app/team"
        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-600/40 px-3 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
      >
        + Utwórz drużynę
      </Link>
    );
  }

  if (teams.length === 1) {
    return (
      <Link href="/app/team" className={badgeClasses}>
        <ActiveDot />
        {teams[0].short_name}
      </Link>
    );
  }

  const activeTeam = teams.find((team) => team.id === effectiveActiveId);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`${badgeClasses} ${open ? "bg-neutral-50 dark:bg-neutral-900" : ""}`}
      >
        <ActiveDot />
        {activeTeam?.short_name ?? "Wybierz drużynę"}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-64 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <ul className="space-y-0.5">
            {teams.map((team) => {
              const isActive = team.id === effectiveActiveId;
              return (
                <li key={team.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(team)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                      isActive ? "bg-emerald-50/60 dark:bg-emerald-950/20" : ""
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {isActive && <ActiveDot />}
                      <span className="truncate font-medium">{team.name}</span>
                    </span>
                    <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-500">
                      {ROLE_LABELS[team.role]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 border-t border-neutral-200 pt-1 dark:border-neutral-800">
            <Link
              href="/app/team"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              + Utwórz drużynę
            </Link>
          </div>
        </div>
      )}

      {confirmation && (
        <div
          role="status"
          className="absolute left-0 z-50 mt-2 whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-lg dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400"
        >
          {confirmation}
        </div>
      )}
      {switchError && (
        <div
          role="alert"
          className="absolute left-0 z-50 mt-2 whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 shadow-lg dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
        >
          Nie udało się przełączyć drużyny. Spróbuj ponownie.
        </div>
      )}
    </div>
  );
}
