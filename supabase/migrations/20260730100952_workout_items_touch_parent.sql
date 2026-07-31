create or replace function public.touch_parent_workout()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.workouts set updated_at = now()
   where id = coalesce(new.workout_id, old.workout_id);
  return coalesce(new, old);
end $$;

drop trigger if exists workout_items_touch_parent on public.workout_items;
create trigger workout_items_touch_parent
  after insert or update or delete on public.workout_items
  for each row execute function public.touch_parent_workout();
