-- NEVERT — homepage hero slides (run once in Supabase SQL editor).
-- The admin manages these from /admin/hero (upload or paste a direct link).
-- The storefront shows active slides first; products/demo only fill the gap.

create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  alt_en text not null default '',
  alt_ar text not null default '',
  sort integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table hero_slides enable row level security;

drop policy if exists "hero slides are public" on hero_slides;
create policy "hero slides are public" on hero_slides for select using (true);

grant usage on schema public to anon, authenticated, service_role;
grant select on public.hero_slides to anon, authenticated, service_role;
grant select, insert, update, delete on public.hero_slides to service_role;
