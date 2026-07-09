-- Coach Zone — core schema
-- Migration 2 of 4. Run after 20260709100000_extensions_and_helpers.sql.

-- profiles: one row per auth user, created by the handle_new_user trigger
-- (see migration 4). Never inserted directly by clients.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  club_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- categories: static reference data for exercises, managed via migrations/seed only.
create table public.categories (
  id serial primary key,
  slug text not null unique,
  name_pl text not null,
  name_en text not null
);

-- exercises: author_id is nullable so official library exercises (seeded,
-- author_id null) can coexist with user-authored ones.
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles (id) on delete set null,
  category_id integer not null references public.categories (id),
  title text not null,
  description text,
  steps text[] not null default '{}',
  duration_min integer,
  difficulty smallint check (difficulty between 1 and 5),
  equipment text[] not null default '{}',
  media_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index exercises_author_id_idx on public.exercises (author_id);
create index exercises_category_id_idx on public.exercises (category_id);

-- workouts: a coach's training session plan. share_id is a random,
-- unguessable token used for the public read-only share link (see the
-- get_shared_workout function in migration 4).
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  team_name text,
  scheduled_for date,
  notes text,
  share_id text not null unique default public.generate_share_id(),
  created_at timestamptz not null default now()
);

create index workouts_owner_id_idx on public.workouts (owner_id);

-- workout_items: exercises placed into a workout, grouped into sections.
create table public.workout_items (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id),
  section text not null check (section in ('warmup', 'main', 'positional', 'cooldown')),
  position integer not null,
  duration_min integer,
  assigned_to text
);

create index workout_items_workout_id_idx on public.workout_items (workout_id);
create index workout_items_exercise_id_idx on public.workout_items (exercise_id);
