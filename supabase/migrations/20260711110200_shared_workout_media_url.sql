-- Coach Zone — shared workout diagram
-- Migration 10. Run after 20260711110100_exercise_immutability_rls.sql.

-- The public share page and the PDF export now render each exercise's
-- tactics-board diagram (Round 10) - extend the embedded exercise object
-- with media_url so both can render it without needing table access to
-- exercises (anon still has none, same reasoning as migration 5).
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
