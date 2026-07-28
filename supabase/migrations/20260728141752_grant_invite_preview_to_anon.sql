-- Grant get_invite_preview() to anon too, not just authenticated (as
-- originally shipped in 20260728133850_team_support.sql). An invited
-- person should see which team they're being invited to *before*
-- deciding whether to create an account - "join Husaria Szczecin's
-- staff" is a much stronger prompt than "log in to find out what this
-- is". Security is unchanged: the token still carries ~72 bits of
-- entropy (generate_share_id()) and the function still returns only
-- team_name, short_name, and a validity flag - the same model as
-- get_shared_workout(), which anon can already call.
grant execute on function public.get_invite_preview(text) to anon;
