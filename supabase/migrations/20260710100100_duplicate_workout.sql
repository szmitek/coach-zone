-- Coach Zone — duplicate workout
-- Migration 7. Run after 20260710100000_sports_and_exercise_sport_id.sql.

-- Duplicates a workout the caller owns into a new workout row (fresh id and
-- a new share_id - the copy never reuses the original's public share
-- token) plus copies of all its workout_items. Deliberately security
-- invoker (the default, so not declared): the owner-only RLS policies
-- already guarantee the caller can only select a workout they own (the
-- first insert's source select) and can only insert rows owned by
-- themselves (owner_id = auth.uid()), so this function needs no elevated
-- privilege at all. The whole body runs as a single statement from
-- Postgres's point of view, so a failure partway through (e.g. the items
-- insert) rolls back the new workout row too - no half-copied workout can
-- result.
create or replace function public.duplicate_workout(p_workout_id uuid)
returns public.workouts
language plpgsql
as $$
declare
  new_workout public.workouts;
begin
  insert into public.workouts (owner_id, title, team_name, scheduled_for, notes)
  select auth.uid(), w.title || ' (kopia)', w.team_name, null, w.notes
  from public.workouts w
  where w.id = p_workout_id
  returning * into new_workout;

  if new_workout.id is null then
    raise exception 'Workout % not found or not owned by the caller', p_workout_id;
  end if;

  insert into public.workout_items
    (workout_id, exercise_id, section, position, duration_min, assigned_to)
  select new_workout.id, wi.exercise_id, wi.section, wi.position, wi.duration_min, wi.assigned_to
  from public.workout_items wi
  where wi.workout_id = p_workout_id;

  return new_workout;
end;
$$;

grant execute on function public.duplicate_workout(uuid) to authenticated;
