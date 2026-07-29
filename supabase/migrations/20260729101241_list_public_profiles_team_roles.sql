-- Coach Zone — teammate attribution, part 1: list_public_profiles()
--
-- AuthorBadge needs to show whether a teammate's exercise came from the
-- head coach or an assistant. list_public_profiles() is the only channel
-- through which one coach can see another's attribution (see
-- 20260712100000_coach_pseudonyms.sql), so it gains a team_roles column
-- rather than a second RPC.
--
-- team_roles is scoped to teams the caller shares with that profile (via
-- my_team_ids()), not every team the profile belongs to - the function
-- already exposes id + display_name for every profile globally, but their
-- full team membership graph is not this feature's business to expose.
-- One row per profile is kept (team_roles is a jsonb array) so existing
-- `authorsById.set(author.id, author)` map-building call sites keep working
-- unchanged.
--
-- Postgres cannot CREATE OR REPLACE a function while changing its
-- RETURNS TABLE column set, so the old signature must be dropped first.
drop function if exists public.list_public_profiles();

create function public.list_public_profiles()
returns table (id uuid, display_name text, team_roles jsonb)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id,
    p.display_name,
    coalesce(
      jsonb_agg(jsonb_build_object('team_id', tm.team_id, 'role', tm.role))
        filter (where tm.team_id is not null),
      '[]'::jsonb
    ) as team_roles
  from public.profiles p
  left join public.team_members tm
    on tm.user_id = p.id
   and tm.team_id in (select public.my_team_ids())
  group by p.id, p.display_name;
$$;

grant execute on function public.list_public_profiles() to authenticated;
