-- Coach Zone — workout audience selector, part 1: schema
--
-- Workouts have no visibility concept today, only owner_id and the public
-- share link (share_id). WorkoutBasicsForm is getting the same "who is this
-- for" control as ExerciseForm (personal / team / public library), so it
-- needs somewhere to write the "public" choice - team_id already exists
-- (added for exercises and workouts together in 20260728133850_team_support.sql).
--
-- Select RLS is deliberately left unchanged (owner_id = auth.uid() OR
-- team_id in my_team_ids()): there is no page yet that browses public
-- workouts across coaches, so broadening it now would just leak other
-- coaches' public workouts into "Twoje treningi" and the calendar, both of
-- which trust RLS alone to scope their unfiltered `select("*")` queries to
-- "mine". Wiring that up is future work, same as team_id was schema-only
-- until this round.
alter table public.workouts
  add column if not exists is_public boolean not null default false;

comment on column public.workouts.is_public is
  'Analogicznie do exercises.is_public - pisane przez audience selector w WorkoutBasicsForm. Select RLS pozostaje owner/team: nie ma jeszcze widoku przegladania publicznych treningow innych trenerow.';
