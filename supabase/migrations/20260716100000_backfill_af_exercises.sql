-- Coach Zone — correct the sport_id backfill for existing exercises
-- Migration 13. Run after 20260712100000_coach_pseudonyms.sql.

-- Migration 6 (20260710100000_sports_and_exercise_sport_id.sql) backfilled
-- every pre-existing exercise to 'football' (soccer) because that was the
-- only sport row that existed at the time. 'american_football' was only
-- added afterward, in migration 7 (20260711100000). Every exercise in the
-- library today is actually American football content authored by the
-- single coach using this instance, so re-point them now that the correct
-- sport row exists. New exercises created since then already carry the
-- sport the coach picked explicitly in the form and are unaffected.
update public.exercises
set sport_id = (select id from public.sports where slug = 'american_football')
where sport_id = (select id from public.sports where slug = 'football');
