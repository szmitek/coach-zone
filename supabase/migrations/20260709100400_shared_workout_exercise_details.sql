-- Coach Zone — shared workout exercise details
-- Migration 5. Run after 20260709100300_triggers_and_functions.sql.

-- The public share page and PDF export need each item's exercise title and
-- description, but exercises has no RLS policy for the anon role (it's
-- readable `to authenticated` only). Rather than opening exercises up to
-- anon, extend the existing security-definer function to embed the exercise
-- fields directly, still scoped to only the exercises used by this one
-- shared workout - never a broader table scan.
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
                'description', e.description
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
