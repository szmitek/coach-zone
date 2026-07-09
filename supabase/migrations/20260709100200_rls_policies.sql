-- Coach Zone — Row Level Security
-- Migration 3 of 4. Run after 20260709100100_schema.sql.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_items enable row level security;

-- profiles: any authenticated user can read all profiles (needed to show
-- e.g. a coach's name elsewhere in the app); only the owner can update
-- their own row. No insert/delete policy - rows are only ever created by
-- the handle_new_user trigger (security definer, bypasses RLS).
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- categories: public reference data, readable by anyone.
create policy "categories_select_public"
  on public.categories for select
  to anon, authenticated
  using (true);

-- exercises: readable when public or owned; writable only by the author.
-- Seeded official rows have author_id null, so `author_id = auth.uid()`
-- is never true for them - no user can insert with a null author_id,
-- and none can update/delete the seeded rows.
create policy "exercises_select_own_or_public"
  on public.exercises for select
  to authenticated
  using (is_public or author_id = auth.uid());

create policy "exercises_insert_own"
  on public.exercises for insert
  to authenticated
  with check (author_id = auth.uid());

create policy "exercises_update_own"
  on public.exercises for update
  to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid());

create policy "exercises_delete_own"
  on public.exercises for delete
  to authenticated
  using (author_id = auth.uid());

-- workouts: full CRUD restricted to the owner. No public select policy -
-- the public share link is served exclusively through the
-- get_shared_workout() security definer function (migration 4).
create policy "workouts_select_own"
  on public.workouts for select
  to authenticated
  using (owner_id = auth.uid());

create policy "workouts_insert_own"
  on public.workouts for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy "workouts_update_own"
  on public.workouts for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "workouts_delete_own"
  on public.workouts for delete
  to authenticated
  using (owner_id = auth.uid());

-- workout_items: same ownership rule, enforced via the parent workout.
create policy "workout_items_select_own"
  on public.workout_items for select
  to authenticated
  using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_items.workout_id
        and w.owner_id = auth.uid()
    )
  );

create policy "workout_items_insert_own"
  on public.workout_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.workouts w
      where w.id = workout_items.workout_id
        and w.owner_id = auth.uid()
    )
  );

create policy "workout_items_update_own"
  on public.workout_items for update
  to authenticated
  using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_items.workout_id
        and w.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workouts w
      where w.id = workout_items.workout_id
        and w.owner_id = auth.uid()
    )
  );

create policy "workout_items_delete_own"
  on public.workout_items for delete
  to authenticated
  using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_items.workout_id
        and w.owner_id = auth.uid()
    )
  );
