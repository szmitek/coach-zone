import type { PlayUnit } from "@/lib/supabase/types";

export const UNIT_OPTIONS: PlayUnit[] = ["offense", "defense", "special_teams"];

export const UNIT_LABELS: Record<PlayUnit, string> = {
  offense: "Ofensywa",
  defense: "Defensywa",
  special_teams: "Zespoły specjalne",
};

// Plays are drawn around the (schematic) line of scrimmage, not tied to an
// actual field position - "redzone" is simply the one AF field mode that's
// zoomed in on a working strip of the field rather than showing it in full
// (see lib/board/sports/americanFootball.tsx), which is what that view is
// for here. Passed as TacticsBoard's initialFieldModeId, which already
// falls back to the active sport's own defaultFieldModeId when this id
// isn't one of its modes - safe to reuse as-is once other sports arrive.
export const DEFAULT_PLAY_FIELD_MODE = "redzone";

// Mirrors plays_delete (supabase/migrations/20260813143718_create_plays_table.sql):
// owner, or the team's head coach. Kept here and tested so a future RLS
// change that isn't mirrored here fails loudly instead of quietly showing
// (or hiding) the wrong button - same rationale as canDeleteWorkout.
export function canDeletePlay(params: {
  ownerId: string;
  teamId: string | null;
  currentUserId: string | null;
  isHeadCoach: boolean;
}): boolean {
  if (params.currentUserId === null) return false;
  if (params.ownerId === params.currentUserId) return true;
  return params.teamId !== null && params.isHeadCoach;
}
