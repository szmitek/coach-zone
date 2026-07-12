-- Coach Zone — add American football as a first-class sport
-- Migration 7. Run after 20260710100100_duplicate_workout.sql.

-- Previously added by hand directly in the production DB (round 9 mistake:
-- the tactics board launched soccer-only). Captured here so every
-- environment (local, CI, other devs) gets the same reference row instead
-- of relying on an undocumented manual edit.
insert into public.sports (slug, name_pl, name_en) values
  ('american_football', 'Futbol amerykański', 'American football')
on conflict (slug) do nothing;
