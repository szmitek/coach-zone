// "Who is this for" - the mutually exclusive choice shared by ExerciseForm
// and WorkoutBasicsForm's create mode. Both resolve to the same
// is_public/team_id pair (see
// supabase/migrations/20260728133850_team_support.sql and
// supabase/migrations/20260729101005_workouts_is_public.sql), so the
// conversion lives here once instead of in each form.
export type Audience =
  | { kind: "personal" }
  | { kind: "team"; teamId: string }
  | { kind: "public" };

export function audienceToFields(audience: Audience): {
  is_public: boolean;
  team_id: string | null;
} {
  switch (audience.kind) {
    case "public":
      return { is_public: true, team_id: null };
    case "team":
      return { is_public: false, team_id: audience.teamId };
    case "personal":
      return { is_public: false, team_id: null };
  }
}

export function audienceEquals(a: Audience, b: Audience): boolean {
  if (a.kind !== b.kind) return false;
  return a.kind === "team" && b.kind === "team" ? a.teamId === b.teamId : true;
}

// A coach in a staff shares with the staff by default, not hoarded - but
// only when there's exactly one team to default to. With zero or several
// teams there's no single obvious choice, so default to personal and make
// the coach choose explicitly (this choice is permanent for exercises).
export function defaultAudience(teams: { id: string }[]): Audience {
  return teams.length === 1
    ? { kind: "team", teamId: teams[0].id }
    : { kind: "personal" };
}
