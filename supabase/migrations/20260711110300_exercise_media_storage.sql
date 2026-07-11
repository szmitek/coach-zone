-- Coach Zone — exercise diagram storage
-- Migration 11. Run after 20260711110200_shared_workout_media_url.sql.

-- Bucket for exported tactics-board PNGs (Round 10). Public so exercise
-- detail pages, the PDF export, and the public share page can all render
-- the image with a plain <img>/Image src and no signed URL. 2 MB cap plus
-- an image/png-only allow-list keeps this cheap on the Supabase free tier -
-- the client already exports at a capped pixel ratio, this is the
-- server-side backstop.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('exercise-media', 'exercise-media', true, 2097152, array['image/png'])
on conflict (id) do nothing;

-- storage.objects ships with RLS already enabled by Supabase - only
-- policies are added here.

create policy "exercise_media_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'exercise-media');

-- Uploads are keyed by path "<uid>/<file>.png" (enforced client-side by the
-- upload call in ExerciseForm); this restricts writes to a coach's own
-- folder so nobody can overwrite or fill up another coach's namespace.
create policy "exercise_media_insert_own_folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'exercise-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "exercise_media_delete_own_folder"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'exercise-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
