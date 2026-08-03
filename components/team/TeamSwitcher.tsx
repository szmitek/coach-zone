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

// The short name's whole job is to read on its own at a glance - in the
// header control and in every dropdown row alike, at the same size, so the
// two contexts feel like one control. Fill alone communicates active
// (emerald) vs not (neutral grey); nothing else needs to.
function TeamTile({
  shortName,
  active,
}: {
  shortName: string;
  active: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg px-1.5 text-xs font-bold tracking-tight ${
        active
          ? "bg-emerald-500 text-emerald-950"
          : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
      }`}
    >
      {shortName}
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="hidden shrink-0 text-neutral-400 sm:block"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lives to the right of the logo lockup in the app header, and is meant to
// read as "where I am" rather than another nav link: a rounded tile carries
// the short name, the full name sits beside it, and a divider (added by
// AppLayout) separates the control from the nav links. Two states only -
// no team (a dashed create affordance) and one-or-more teams (always a
// dropdown, even for exactly one team, since the dropdown is also the only
// route to "+ Utwórz drużynę", and a coach running e.g. senior + junior
// squads off one account needs that route the moment they've made just the
// first one - a lone team is not "nothing to switch to"). Writes
// profiles.active_team_id directly - it's already owner-only via RLS, no
// new permission needed - and persists server-side on purpose: a coach
// opening the app on their phone at the training ground should already be
// in the right team's context.
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
        href="/app/team/new"
        aria-label="Utwórz drużynę"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 p-1 text-sm font-medium text-neutral-500 transition-colors hover:border-emerald-500/60 hover:text-emerald-600 sm:pr-3 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-500/50 dark:hover:text-emerald-500"
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-current text-base leading-none"
        >
          +
        </span>
        <span className="hidden sm:inline">Utwórz drużynę</span>
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
        aria-label={
          activeTeam ? `Aktywna drużyna: ${activeTeam.name}` : "Wybierz drużynę"
        }
        className={`flex shrink-0 items-center gap-2 rounded-xl p-1 transition-colors hover:bg-neutral-100 sm:pr-2 dark:hover:bg-neutral-800/60 ${
          open ? "bg-neutral-100 dark:bg-neutral-800/60" : ""
        }`}
      >
        <TeamTile
          shortName={activeTeam?.short_name ?? "?"}
          active={Boolean(activeTeam)}
        />
        <span className="hidden max-w-[12rem] truncate text-sm font-semibold text-neutral-900 sm:block dark:text-neutral-100">
          {activeTeam?.name ?? "Wybierz drużynę"}
        </span>
        <ChevronIcon />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <ul className="space-y-0.5">
            {teams.map((team) => {
              const isActive = team.id === effectiveActiveId;
              return (
                <li key={team.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(team)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                      isActive ? "bg-emerald-50/60 dark:bg-emerald-950/20" : ""
                    }`}
                  >
                    <TeamTile shortName={team.short_name} active={isActive} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {team.name}
                      </span>
                      <span className="block text-xs text-neutral-500 dark:text-neutral-500">
                        {ROLE_LABELS[team.role]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 border-t border-neutral-200 pt-1 dark:border-neutral-800">
            {/* /app/team/new, not /app/team: this is reachable from a coach
                who already has teams, and /app/team shows their roster, not
                a create form. */}
            <Link
              href="/app/team/new"
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
