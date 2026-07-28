-- Coach Zone — exercise scope, positions, and sport_id fix
-- Run after 20260716110000_add_onboarding_completed.sql.
-- Reconstructed from supabase_migrations.schema_migrations (version
-- 20260727210405); applied directly to the database and not previously
-- captured as a file in this repo's migration history.

alter table exercises alter column sport_id drop not null;
alter table exercises alter column sport_id drop default;

comment on column exercises.sport_id is
  'NULL = cwiczenie uniwersalne, widoczne dla kazdej dyscypliny. Brak defaultu celowo - insert musi ustawiac jawnie.';

alter table exercises add column if not exists scope text not null default 'private';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'exercises_scope_check') then
    alter table exercises add constraint exercises_scope_check
      check (scope in ('official', 'private', 'team'));
  end if;
end $$;

update exercises set scope = 'official'
where author_id is null and scope <> 'official';

do $$
declare
  v_football int;
begin
  select id into v_football from sports where slug = 'football';
  if v_football is null then
    raise exception 'Nie znaleziono sportu o slugu "football".';
  end if;

  update exercises set sport_id = v_football
  where author_id is null and title in (
    'Rondo 4v1',
    'Podania w parach na dwa kontakty',
    'Prowadzenie piłki w slalomie',
    'Uderzenia na bramkę po podaniu',
    'Gra pozycyjna 6v6+3',
    'Wyprowadzenie piłki spod pressingu 4v2',
    'Gra 4v4 na cztery bramki',
    'Gra 7v7 z warunkiem dwóch kontaktów',
    'Przejście z obrony do ataku (tranzycja)'
  );
end $$;

update exercises set sport_id = null
where author_id is null and title in (
  'Rozgrzewka dynamiczna w truchcie',
  'Trucht wytłumiający i rozciąganie statyczne',
  'Rolowanie i mobilizacja',
  'Aktywacja z drabinką koordynacyjną',
  'Interwały biegowe wysokiej intensywności',
  'Obwód siłowy z masą własnego ciała'
);

create table if not exists positions (
  id         uuid primary key default gen_random_uuid(),
  sport_id   integer not null references sports(id) on delete cascade,
  code       text not null,
  label      text not null,
  sort_order integer not null default 0,
  unique (sport_id, code)
);

create table if not exists exercise_positions (
  exercise_id uuid not null references exercises(id) on delete cascade,
  position_id uuid not null references positions(id) on delete cascade,
  primary key (exercise_id, position_id)
);

create index if not exists exercise_positions_position_idx
  on exercise_positions (position_id);

do $$
declare
  v_af int;
begin
  select id into v_af from sports where slug = 'american_football';
  if v_af is null then
    raise exception 'Nie znaleziono sportu o slugu "american_football".';
  end if;

  insert into positions (sport_id, code, label, sort_order) values
    (v_af, 'OL',   'Linia ofensywna (OL)',   10),
    (v_af, 'QB',   'Rozgrywający (QB)',      20),
    (v_af, 'RB',   'Biegacz (RB)',           30),
    (v_af, 'WR',   'Skrzydłowy (WR)',        40),
    (v_af, 'TE',   'Tight end (TE)',         50),
    (v_af, 'DL',   'Linia defensywna (DL)',  60),
    (v_af, 'DE',   'Defensive end (DE)',     70),
    (v_af, 'LB',   'Linebacker (LB)',        80),
    (v_af, 'DB',   'Defensive back (DB)',    90),
    (v_af, 'TEAM', 'Cała drużyna',          100)
  on conflict (sport_id, code) do nothing;
end $$;

alter table positions enable row level security;
alter table exercise_positions enable row level security;

drop policy if exists positions_select on positions;
create policy positions_select on positions
  for select to authenticated using (true);

drop policy if exists exercise_positions_select on exercise_positions;
create policy exercise_positions_select on exercise_positions
  for select to authenticated using (true);
