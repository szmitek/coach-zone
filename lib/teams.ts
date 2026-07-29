import type { TeamRole } from "@/lib/supabase/types";

export const ROLE_LABELS: Record<TeamRole, string> = {
  head_coach: "Główny trener",
  assistant_coach: "Asystent",
};

// The library and calendar (and the switcher itself) all need "which team
// is active", but active_team_id can be null even when a coach has exactly
// one team - nothing ever prompts them to choose when there's no real
// choice (see TeamSwitcher: a lone team gets no chevron, so there is no
// control that would write active_team_id for it). Treat that sole team as
// effectively active everywhere this matters, without ever writing it back.
export function resolveActiveTeamId(
  activeTeamId: string | null,
  teams: { id: string }[],
): string | null {
  if (activeTeamId) return activeTeamId;
  return teams.length === 1 ? teams[0].id : null;
}

// Shared by the exercise library and the workout calendar: an item scoped
// to a team (team_id set) is only in scope while that team is active. An
// item with no team (personal or public) is never gated by team context -
// mirrors the existing sport filter's "sport_id === null is universal"
// guard, so this doesn't repeat that bug (an exact-match-only comparison
// would wrongly hide every personal/public item whenever a team is active,
// since their team_id is null and null !== activeTeamId).
export function isInActiveTeamScope(
  item: { team_id: string | null },
  activeTeamId: string | null,
): boolean {
  return item.team_id === null || item.team_id === activeTeamId;
}
