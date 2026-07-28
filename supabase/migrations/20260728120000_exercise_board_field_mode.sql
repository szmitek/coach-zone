-- Coach Zone — exercise board field mode
-- Run after 20260716110000_add_onboarding_completed.sql (plus the
-- exercise_scope_positions_and_sport_fix and seed_american_football_exercises
-- migrations already applied directly to the database, not yet present as
-- files in this repo's migration history).

-- Persists which field-view mode (lib/board/sports/types.ts,
-- FieldViewMode.id - e.g. American football's "full" vs "redzone") a saved
-- board_state diagram was drawn in. Coordinates inside board_state are
-- absolute logical pixels in that mode's own stage size (redzone is
-- 384x520 vs full's 1200x520), so reopening a diagram under the wrong mode
-- renders it squashed into the wrong portion of the field.
--
-- Kept as a sibling column rather than folded into board_state's JSON so
-- existing rows keep working untouched: a null value here falls back to
-- the sport's defaultFieldModeId exactly as before this column existed.
alter table public.exercises
  add column board_field_mode text;

comment on column public.exercises.board_field_mode is
  'Field-view mode id (FieldViewMode.id, e.g. "full" or "redzone") the board_state diagram was authored in. Null falls back to the sport''s defaultFieldModeId.';
