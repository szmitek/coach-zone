-- Coach Zone — shared workout steps + equipment
-- Migration 12. Run after 20260711110300_exercise_media_storage.sql.

-- The workout PDF (and the public share page it's built from) never
-- rendered an exercise's "Przebieg ćwiczenia" steps or its equipment list,
-- because get_shared_workout() never selected those columns in the first
-- place - extend the embedded exercise object with both, same reasoning as
-- migration 10 (media_url).
create or replace function public.get_shared_workout(p_share_id text)
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select jsonb_build_object(
    'workout', to_jsonb(w.*),
    'items', coalesce(
      (
        select jsonb_agg(
          to_jsonb(wi.*) || jsonb_build_object(
            'exercise',
            case
              when e.id is null then null
              else jsonb_build_object(
                'id', e.id,
                'title', e.title,
                'description', e.description,
                'steps', e.steps,
                'equipment', e.equipment,
                'media_url', e.media_url
              )
            end
          )
          order by wi.section, wi.position
        )
        from public.workout_items wi
        left join public.exercises e on e.id = wi.exercise_id
        where wi.workout_id = w.id
      ),
      '[]'::jsonb
    )
  )
  from public.workouts w
  where w.share_id = p_share_id;
$$;

grant execute on function public.get_shared_workout(text) to anon, authenticated;
