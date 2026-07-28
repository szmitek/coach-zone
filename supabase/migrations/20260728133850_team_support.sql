-- 1. Martwa kolumna scope — usunięcie
alter table public.exercises drop column if exists scope;

-- 2. Drużyny
create table if not exists public.teams (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  short_name  text not null check (char_length(short_name) between 2 and 6),
  created_by  uuid not null references public.profiles(id) on delete restrict,
  created_at  timestamptz not null default now()
);

create table if not exists public.team_members (
  team_id   uuid not null references public.teams(id) on delete cascade,
  user_id   uuid not null references public.profiles(id) on delete cascade,
  role      text not null check (role in ('head_coach','assistant_coach')),
  joined_at timestamptz not null default now(),
  primary key (team_id, user_id)
);
create index if not exists team_members_user_idx on public.team_members(user_id);

create table if not exists public.team_invites (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  token      text not null unique default public.generate_share_id(),
  created_by uuid not null references public.profiles(id) on delete cascade,
  expires_at timestamptz not null default now() + interval '7 days',
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

-- 3. Przypisanie do drużyny
alter table public.exercises add column if not exists team_id uuid references public.teams(id) on delete set null;
alter table public.workouts  add column if not exists team_id uuid references public.teams(id) on delete set null;
create index if not exists exercises_team_idx on public.exercises(team_id);
create index if not exists workouts_team_idx  on public.workouts(team_id);

comment on column public.workouts.team_id is
  'Druzyna wlasciciel. Bez zwiazku z workouts.team_name, ktore jest wolna etykieta tekstowa.';

-- 4. Helpery — istnieja po to, zeby polityki na team_members nie odpytywaly team_members
--    (RLS w Postgresie wpada wtedy w nieskonczona rekurencje).
create or replace function public.is_team_member(p_team_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.team_members m
                 where m.team_id = p_team_id and m.user_id = auth.uid());
$$;

create or replace function public.is_team_head_coach(p_team_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.team_members m
                 where m.team_id = p_team_id and m.user_id = auth.uid()
                   and m.role = 'head_coach');
$$;

create or replace function public.my_team_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select m.team_id from public.team_members m where m.user_id = auth.uid();
$$;

grant execute on function public.is_team_member(uuid)     to authenticated;
grant execute on function public.is_team_head_coach(uuid) to authenticated;
grant execute on function public.my_team_ids()            to authenticated;

-- 5. Tworca druzyny zostaje head coachem
create or replace function public.add_team_creator_as_head_coach()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.team_members (team_id, user_id, role)
  values (new.id, new.created_by, 'head_coach')
  on conflict do nothing;
  return new;
end $$;

drop trigger if exists teams_add_creator on public.teams;
create trigger teams_add_creator after insert on public.teams
  for each row execute function public.add_team_creator_as_head_coach();

-- 6. RLS — jawnie, bo rls_auto_enable() nie istnieje w repo
alter table public.teams         enable row level security;
alter table public.team_members  enable row level security;
alter table public.team_invites  enable row level security;

drop policy if exists teams_select on public.teams;
create policy teams_select on public.teams for select to authenticated
  using (public.is_team_member(id));

drop policy if exists teams_insert on public.teams;
create policy teams_insert on public.teams for insert to authenticated
  with check (created_by = auth.uid());

drop policy if exists teams_update on public.teams;
create policy teams_update on public.teams for update to authenticated
  using (public.is_team_head_coach(id)) with check (public.is_team_head_coach(id));

drop policy if exists team_members_select on public.team_members;
create policy team_members_select on public.team_members for select to authenticated
  using (public.is_team_member(team_id));

-- brak INSERT: dolaczanie wylacznie przez join_team_with_token()
drop policy if exists team_members_delete on public.team_members;
create policy team_members_delete on public.team_members for delete to authenticated
  using (public.is_team_head_coach(team_id) or user_id = auth.uid());

drop policy if exists team_invites_select on public.team_invites;
create policy team_invites_select on public.team_invites for select to authenticated
  using (public.is_team_head_coach(team_id));

drop policy if exists team_invites_insert on public.team_invites;
create policy team_invites_insert on public.team_invites for insert to authenticated
  with check (public.is_team_head_coach(team_id) and created_by = auth.uid());

drop policy if exists team_invites_update on public.team_invites;
create policy team_invites_update on public.team_invites for update to authenticated
  using (public.is_team_head_coach(team_id)) with check (public.is_team_head_coach(team_id));

-- 7. Widocznosc cwiczen i treningow rozszerzona o druzyne
drop policy if exists exercises_select_own_or_public on public.exercises;
create policy exercises_select_own_or_public on public.exercises for select to authenticated
  using (is_public or author_id = auth.uid() or team_id in (select public.my_team_ids()));

drop policy if exists workouts_select_own on public.workouts;
create policy workouts_select_own on public.workouts for select to authenticated
  using (owner_id = auth.uid() or team_id in (select public.my_team_ids()));

-- 8. Zaproszenia: podglad i dolaczenie
create or replace function public.get_invite_preview(p_token text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
           'team_name', t.name,
           'short_name', t.short_name,
           'valid', i.revoked_at is null and i.expires_at > now())
  from public.team_invites i join public.teams t on t.id = i.team_id
  where i.token = p_token;
$$;

create or replace function public.join_team_with_token(p_token text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_inv public.team_invites; v_uid uuid := auth.uid();
begin
  if v_uid is null then return jsonb_build_object('ok', false, 'reason', 'not_authenticated'); end if;
  select * into v_inv from public.team_invites where token = p_token;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;
  if v_inv.revoked_at is not null then return jsonb_build_object('ok', false, 'reason', 'revoked'); end if;
  if v_inv.expires_at <= now() then return jsonb_build_object('ok', false, 'reason', 'expired'); end if;

  insert into public.team_members (team_id, user_id, role)
  values (v_inv.team_id, v_uid, 'assistant_coach')
  on conflict (team_id, user_id) do nothing;

  return jsonb_build_object('ok', true, 'team_id', v_inv.team_id);
end $$;

grant execute on function public.get_invite_preview(text)   to authenticated;
grant execute on function public.join_team_with_token(text) to authenticated;
