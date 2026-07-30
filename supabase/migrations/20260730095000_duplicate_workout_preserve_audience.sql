-- Coach Zone — duplicate_workout: preserve team_id and is_public
--
-- duplicate_workout() predates team support and the audience selector
-- (20260710100100_duplicate_workout.sql, before team_id/is_public existed
-- on workouts). It already copies team_name verbatim; team_id and
-- is_public were simply never added to that column list, so "Duplikuj" on
-- a team-scoped or public workout silently drops both and the copy becomes
-- private to the duplicator - not a choice the coach made, and one they
-- can't undo since WorkoutBasicsForm's edit mode has nowhere to change
-- audience after creation.
create or replace function public.duplicate_workout(p_workout_id uuid)
returns public.workouts
language plpgsql
as $$
declare
  new_workout public.workouts;
begin
  insert into public.workouts (owner_id, title, team_name, scheduled_for, notes, team_id, is_public)
  select auth.uid(), w.title || ' (kopia)', w.team_name, null, w.notes, w.team_id, w.is_public
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
