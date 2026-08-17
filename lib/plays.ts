import type { PlayUnit } from "@/lib/supabase/types";

export const UNIT_OPTIONS: PlayUnit[] = ["offense", "defense", "special_teams"];

export const UNIT_LABELS: Record<PlayUnit, string> = {
  offense: "Ofensywa",
  defense: "Defensywa",
  special_teams: "Zespoły specjalne",
};

// Plays are schematic (not tied to an actual field position), and drawn
// vertically per standard playbook convention: LOS across, routes going up.
// "play" ("Zagrywka") is the AF field mode built for exactly that (see
// lib/board/sports/americanFootball.tsx / AmericanFootballField.tsx) - a
// portrait LOS-zoom canvas, not the sport's own defaultFieldModeId (which
// stays "full" for exercises). Passed as TacticsBoard's initialFieldModeId,
// which already falls back to the active sport's own defaultFieldModeId
// when this id isn't one of its modes - safe to reuse as-is once other
// sports arrive.
export const DEFAULT_PLAY_FIELD_MODE = "play";

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
