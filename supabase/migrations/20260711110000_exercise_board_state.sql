-- Coach Zone — exercise board state
-- Migration 8. Run after 20260711100000_add_american_football_sport.sql.

-- Persists the tactics-board drawing behind an exercise's media_url PNG as
-- editable data (BoardElement[] from lib/board/types.ts, as JSON). Without
-- this, duplicating an exercise (Round 10) could only hand the coach back a
-- flat image - this is what lets the board reopen fully editable.
alter table public.exercises
  add column board_state jsonb;

comment on column public.exercises.board_state is
  'Editable tactics-board state (BoardElement[] as JSON). Null when the exercise has no diagram.';
