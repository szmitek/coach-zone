-- Coach Zone — plays table (playbook, phase 1)
-- Reconstructed from supabase_migrations.schema_migrations (version
-- 20260813143718); applied directly to the database by the architect and
-- captured here so `supabase db reset` reproduces the same state.

-- A play is a board diagram plus metadata - unlike an exercise it is
-- EDITABLE in place (no duplicate-to-edit), SECRET (owner or team only,
-- never public - no is_public column exists here at all), and organized
-- for gameplans rather than workouts. This team draws plays for
-- positions/spots, not named players, so there is deliberately no
-- per-player assignment column: the diagram (spots + routes/blocks) plus
-- the free-text notes field is the whole source of truth. The diagram
-- itself is optional - a name-only play (board_state null) is a complete,
-- saveable row, since the later wrist-card export has a text/names layout
-- that needs no diagram.
create table if not exists public.plays (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  team_id uuid references public.teams (id) on delete cascade,
  sport_id integer not null references public.sports (id),
  name text not null,
  -- Left null on insert to let set_play_number() below assign the next
  -- number in scope; freely editable afterward like every other field.
  play_number integer,
  unit text not null default 'offense' check (unit in ('offense', 'defense', 'special_teams')),
  formation text,
  notes text,
  -- Same shape and round-trip as exercises.board_state / board_field_mode.
  board_state jsonb,
  board_field_mode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_edited_by uuid references auth.users (id)
);

create index if not exists plays_owner_id_idx on public.plays (owner_id);
create index if not exists plays_team_id_idx on public.plays (team_id);

alter table public.plays enable row level security;

-- Visible to its owner, or any member of its team - same shape as
-- workouts_select_own (see 20260730100932_team_workout_coediting.sql).
drop policy if exists plays_select on public.plays;
create policy plays_select on public.plays for select
  using (owner_id = auth.uid() or (team_id is not null and is_team_member(team_id)));

drop policy if exists plays_insert on public.plays;
create policy plays_insert on public.plays for insert
  with check (owner_id = auth.uid() and (team_id is null or is_team_member(team_id)));

-- Any team member can edit a team play in place - there's no separate
-- per-coach assignment model to gate this further in phase 1.
drop policy if exists plays_update on public.plays;
create policy plays_update on public.plays for update
  using (owner_id = auth.uid() or (team_id is not null and is_team_member(team_id)))
  with check (owner_id = auth.uid() or (team_id is not null and is_team_member(team_id)));

-- Narrower than update, same as workouts_delete_own: owner, or the team's
-- head coach.
drop policy if exists plays_delete on public.plays;
create policy plays_delete on public.plays for delete
  using (owner_id = auth.uid() or (team_id is not null and is_team_head_coach(team_id)));

-- Auto-assigns the next play_number in scope (per team, or per owner for
-- personal plays) whenever it's left blank on insert.
create or replace function public.set_play_number()
returns trigger
language plpgsql
as $$
begin
  if new.play_number is null then
    if new.team_id is not null then
      select coalesce(max(play_number), 0) + 1 into new.play_number
        from public.plays where team_id = new.team_id;
    else
      select coalesce(max(play_number), 0) + 1 into new.play_number
        from public.plays where owner_id = new.owner_id and team_id is null;
    end if;
  end if;
  return new;
end $$;

drop trigger if exists plays_set_number on public.plays;
create trigger plays_set_number before insert on public.plays
  for each row execute function public.set_play_number();

create or replace function public.plays_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists plays_touch on public.plays;
create trigger plays_touch before update on public.plays
  for each row execute function public.plays_touch_updated_at();
