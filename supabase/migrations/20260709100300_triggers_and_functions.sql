-- Coach Zone — triggers and RPC functions
-- Migration 4 of 4. Run after 20260709100200_rls_policies.sql.

-- Creates a profiles row right after signup. Runs as security definer so it
-- can insert into profiles despite the caller not being "authenticated" yet
-- at the moment auth.users is written.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keeps exercises.updated_at current on every row update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger exercises_set_updated_at
  before update on public.exercises
  for each row execute function public.set_updated_at();

-- Public, read-only access to a shared workout by its unguessable share_id.
-- Security definer so it can bypass the owner-only RLS policy on workouts /
-- workout_items, while only ever exposing the one row matched by share_id
-- plus its items - never a full table scan. Used by the public share link
-- (frontend for that comes in a later round).
create or replace function public.get_shared_workout(p_share_id text)
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select jsonb_build_object(
    'workout', to_jsonb(w.*),
    'items', coalesce(
      (
        select jsonb_agg(to_jsonb(wi.*) order by wi.section, wi.position)
        from public.workout_items wi
        where wi.workout_id = w.id
      ),
      '[]'::jsonb
    )
  )
  from public.workouts w
  where w.share_id = p_share_id;
$$;

grant execute on function public.get_shared_workout(text) to anon, authenticated;
