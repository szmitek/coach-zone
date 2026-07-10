-- Coach Zone — sport segmentation
-- Migration 6. Run after 20260709100400_shared_workout_exercise_details.sql.

-- sports: static reference data for exercises, managed via migrations/seed
-- only - same shape and intent as categories. Categories stay sport-agnostic
-- (a warmup is a warmup regardless of sport), so this only tags exercises,
-- not categories.
create table public.sports (
  id serial primary key,
  slug text not null unique,
  name_pl text not null,
  name_en text not null
);

insert into public.sports (slug, name_pl, name_en) values
  ('football',   'Piłka nożna',  'Football'),
  ('basketball', 'Koszykówka',   'Basketball'),
  ('volleyball', 'Siatkówka',    'Volleyball'),
  ('handball',   'Piłka ręczna', 'Handball')
on conflict (slug) do nothing;

alter table public.sports enable row level security;

-- sports: public reference data, readable by anyone - same policy shape as
-- categories_select_public.
create policy "sports_select_public"
  on public.sports for select
  to anon, authenticated
  using (true);

-- The whole existing library is implicitly football. Add the column
-- nullable first so the backfill below has something to target, then lock
-- it down once every row has a value.
alter table public.exercises
  add column sport_id integer references public.sports (id);

update public.exercises
  set sport_id = (select id from public.sports where slug = 'football')
  where sport_id is null;

alter table public.exercises
  alter column sport_id set not null;

create index exercises_sport_id_idx on public.exercises (sport_id);

-- Column DEFAULTs can't contain a subquery, so the football id is looked up
-- once here and baked in as a literal via dynamic SQL rather than
-- hardcoding whatever id it happens to get from the insert above.
do $$
declare
  v_football_id integer;
begin
  select id into v_football_id from public.sports where slug = 'football';

  execute format(
    'alter table public.exercises alter column sport_id set default %s',
    v_football_id
  );
end;
$$;
