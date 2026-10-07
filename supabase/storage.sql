-- NEVERT — product image storage (run once in Supabase SQL editor).
-- Creates a public bucket for product/collection photos uploaded from /admin.
-- Uploads go through the server (service role key), so only the public
-- read policy below is needed for visitors to see the images.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "product images are public" on storage.objects;
create policy "product images are public"
  on storage.objects for select
  using (bucket_id = 'product-images');
