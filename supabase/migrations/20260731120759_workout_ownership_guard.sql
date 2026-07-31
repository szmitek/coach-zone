create or replace function public.guard_workout_ownership()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.owner_id is distinct from old.owner_id
     or new.team_id is distinct from old.team_id then
    if not (old.owner_id = auth.uid()
            or (old.team_id is not null and public.is_team_head_coach(old.team_id))) then
      new.owner_id := old.owner_id;
      new.team_id  := old.team_id;
    end if;
  end if;
  return new;
end $$;

drop trigger if exists workouts_guard_ownership on public.workouts;
create trigger workouts_guard_ownership before update on public.workouts
  for each row execute function public.guard_workout_ownership();
