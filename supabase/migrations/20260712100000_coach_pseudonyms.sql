-- Coach Zone — coach pseudonyms + profile privacy hardening
-- Migration 10. Run after 20260711110400_shared_workout_steps_equipment.sql.
--
-- Round 13: display_name was previously either the coach's real full name
-- or their email local-part (see the old handle_new_user() below), and any
-- authenticated user could read every column of every profiles row (RLS is
-- row-level only, it cannot restrict columns). Both are privacy problems on
-- a library where attribution is permanent. This migration:
--   1. backfills existing rows to a neutral generated pseudonym where the
--      value isn't a valid pseudonym, or collides case-insensitively;
--   2. enforces the pseudonym format + case-insensitive uniqueness as real
--      DB constraints, not just client-side checks;
--   3. changes signup to source display_name from a client-supplied
--      'pseudonym' field instead of full_name/email;
--   4. replaces the whole-row "profiles_select_authenticated" policy with
--      an owner-only select policy, plus two narrow security-definer
--      functions that expose only (id, display_name) to authenticated
--      users, and pseudonym-availability to anon (needed for the signup
--      form, before a session exists).

-- 1. Backfill: anything that doesn't already match the pseudonym format
-- gets replaced with a neutral generated one. Never derived from email.
update public.profiles
set display_name = 'trener_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)
where display_name !~ '^[A-Za-z0-9_-]{3,20}$';

-- Resolve any remaining case-insensitive collisions (including ones the
-- backfill above didn't touch), keeping the oldest row's value and
-- renaming the rest.
with dupes as (
  select id,
         row_number() over (
           partition by lower(display_name)
           order by created_at, id
         ) as rn
  from public.profiles
)
update public.profiles p
set display_name = 'trener_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)
from dupes d
where p.id = d.id
  and d.rn > 1;

-- 2. Format + case-insensitive uniqueness as real constraints.
alter table public.profiles
  add constraint profiles_display_name_format
  check (display_name ~ '^[A-Za-z0-9_-]{3,20}$');

create unique index profiles_display_name_lower_idx
  on public.profiles (lower(display_name));

-- 3. Signup now sends a 'pseudonym' field instead of 'full_name'. OAuth
-- signups (e.g. Google) never go through our form, so raw_user_meta_data
-- has no pseudonym for them either - same neutral-fallback pattern as the
-- backfill above, never derived from email.
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
      nullif(trim(new.raw_user_meta_data ->> 'pseudonym'), ''),
      'trener_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)
    )
  );
  return new;
end;
$$;

-- 4a. Lets the signup form (unauthenticated) check availability before
-- submitting, without exposing the pseudonym list itself.
create or replace function public.is_pseudonym_available(p_display_name text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1 from public.profiles
    where lower(display_name) = lower(p_display_name)
  );
$$;

grant execute on function public.is_pseudonym_available(text) to anon, authenticated;

-- 4b. The only channel through which one coach can see another's
-- attribution - id + pseudonym, nothing else. Security definer so it can
-- read every row despite the tightened base-table policy below.
create or replace function public.list_public_profiles()
returns table (id uuid, display_name text)
language sql
security definer
set search_path = public
stable
as $$
  select p.id, p.display_name from public.profiles p;
$$;

grant execute on function public.list_public_profiles() to authenticated;

-- 4c. Replace the whole-row policy: authenticated users can only ever
-- select their own row directly. Every other profile's attribution goes
-- through list_public_profiles() above, which returns id + display_name
-- only. profiles_update_own (owner-scoped) is unchanged.
drop policy if exists "profiles_select_authenticated" on public.profiles;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);
