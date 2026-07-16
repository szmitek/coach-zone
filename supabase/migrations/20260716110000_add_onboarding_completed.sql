-- Coach Zone — onboarding-seen flag
-- Migration 16. Run after 20260716100000_backfill_af_exercises.sql.
--
-- Round 18: the post-signup animated showcase must only ever show once per
-- account, on first login, and that has to survive across devices/sessions
-- - not a client-side flag. `default false` means every existing row is
-- treated as "hasn't seen it yet" (fine - it's a new feature, nobody has),
-- and handle_new_user() needs no changes since it only inserts
-- (id, display_name) and this column's default fills in the rest.
alter table public.profiles
  add column onboarding_completed boolean not null default false;
