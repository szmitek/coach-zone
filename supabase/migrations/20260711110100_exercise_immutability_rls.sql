-- Coach Zone — exercise immutability
-- Migration 9. Run after 20260711110000_exercise_board_state.sql.

-- Round 10 product decision: an exercise can never be edited after
-- creation (to change one, duplicate it into a new exercise instead). This
-- must hold even if a future UI bug tries to call update() - dropping the
-- policy is what actually enforces it, not just hiding the button.
--
-- RLS still has the table's default-deny behind it, but there is
-- deliberately no policy of any kind (permissive or restrictive) for the
-- update command on public.exercises after this migration, for any role.
-- With no policy granting it, Postgres denies every update regardless of
-- ownership - authors included.
drop policy if exists "exercises_update_own" on public.exercises;

-- Deletion is now conditional: a private exercise can be deleted by its
-- author (nobody else could have used it), but a public one cannot - other
-- coaches may already have it in a workout, and the shared library must
-- never lose an entry out from under them.
drop policy if exists "exercises_delete_own" on public.exercises;

create policy "exercises_delete_own_private_only"
  on public.exercises for delete
  to authenticated
  using (author_id = auth.uid() and is_public = false);
