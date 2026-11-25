alter table public.gallery_images
  add column if not exists storage_path text,
  add column if not exists poster_url text,
  add column if not exists media_type text not null default 'image';

alter table public.gallery_images enable row level security;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'gallery',
  'gallery',
  true,
  104857600,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public gallery reads" on public.gallery_images;
create policy "Public gallery reads"
  on public.gallery_images
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public gallery image access" on storage.objects;
drop policy if exists "Public gallery media access" on storage.objects;
create policy "Public gallery media access"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Admin gallery image uploads" on storage.objects;
create policy "Admin gallery image uploads"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'gallery'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admin gallery image updates" on storage.objects;
create policy "Admin gallery image updates"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'gallery'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  with check (
    bucket_id = 'gallery'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admin gallery image deletes" on storage.objects;
create policy "Admin gallery image deletes"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'gallery'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admin gallery metadata management" on public.gallery_images;
create policy "Admin gallery metadata management"
  on public.gallery_images
  for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
