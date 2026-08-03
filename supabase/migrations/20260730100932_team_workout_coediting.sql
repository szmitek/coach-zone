alter table public.workouts
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists last_edited_by uuid references public.profiles(id) on delete set null;

drop trigger if exists workouts_set_updated_at on public.workouts;
create trigger workouts_set_updated_at before update on public.workouts
  for each row execute function public.set_updated_at();

drop policy if exists workouts_update_own on public.workouts;
create policy workouts_update_own on public.workouts for update to authenticated
  using (owner_id = auth.uid() or (team_id is not null and team_id in (select public.my_team_ids())))
  with check (owner_id = auth.uid() or (team_id is not null and team_id in (select public.my_team_ids())));

drop policy if exists workouts_delete_own on public.workouts;
create policy workouts_delete_own on public.workouts for delete to authenticated
  using (owner_id = auth.uid() or (team_id is not null and public.is_team_head_coach(team_id)));

drop policy if exists workout_items_select_own on public.workout_items;
create policy workout_items_select_own on public.workout_items for select to authenticated
  using (exists (select 1 from public.workouts w where w.id = workout_items.workout_id
                 and (w.owner_id = auth.uid() or w.team_id in (select public.my_team_ids()))));

drop policy if exists workout_items_insert_own on public.workout_items;
create policy workout_items_insert_own on public.workout_items for insert to authenticated
  with check (exists (select 1 from public.workouts w where w.id = workout_items.workout_id
                      and (w.owner_id = auth.uid() or w.team_id in (select public.my_team_ids()))));

drop policy if exists workout_items_update_own on public.workout_items;
create policy workout_items_update_own on public.workout_items for update to authenticated
  using (exists (select 1 from public.workouts w where w.id = workout_items.workout_id
                 and (w.owner_id = auth.uid() or w.team_id in (select public.my_team_ids()))))
  with check (exists (select 1 from public.workouts w where w.id = workout_items.workout_id
                      and (w.owner_id = auth.uid() or w.team_id in (select public.my_team_ids()))));

drop policy if exists workout_items_delete_own on public.workout_items;
create policy workout_items_delete_own on public.workout_items for delete to authenticated
  using (exists (select 1 from public.workouts w where w.id = workout_items.workout_id
                 and (w.owner_id = auth.uid() or w.team_id in (select public.my_team_ids()))));
