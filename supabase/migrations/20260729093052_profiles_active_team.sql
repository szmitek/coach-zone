alter table public.profiles
  add column if not exists active_team_id uuid references public.teams(id) on delete set null;

comment on column public.profiles.active_team_id is
  'Ostatnio wybrana druzyna. NULL = kontekst osobisty (trener bez druzyny lub swiadomie poza nia).';

create or replace function public.clear_active_team_on_leave()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles
     set active_team_id = null
   where id = old.user_id and active_team_id = old.team_id;
  return old;
end $$;

drop trigger if exists team_members_clear_active on public.team_members;
create trigger team_members_clear_active after delete on public.team_members
  for each row execute function public.clear_active_team_on_leave();
