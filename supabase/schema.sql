-- Maison — database schema (run in Supabase SQL editor)

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text,
  description text,
  cover_image text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references collections(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null default 0,
  images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  color text not null,
  color_hex text,
  size text not null,
  stock integer not null default 0,
  unique (product_id, color, size)
);

create table if not exists orders (
  id bigserial primary key,
  customer_name text not null,
  whatsapp_number text not null,
  city text,
  notes text,
  items jsonb not null default '[]',
  total numeric(10,2) not null default 0,
  status text not null default 'new'
    check (status in ('new','contacted','confirmed','delivered','cancelled')),
  source text default 'website',
  created_at timestamptz not null default now()
);

create index if not exists orders_status_created_idx on orders (status, created_at desc);

-- Row level security: the site writes orders through the service role key
-- (server side only). The anon key may read the catalogue, nothing else.
alter table collections enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;

drop policy if exists "catalogue is public" on collections;
create policy "catalogue is public" on collections for select using (true);

drop policy if exists "products are public" on products;
create policy "products are public" on products for select using (true);

drop policy if exists "variants are public" on product_variants;
create policy "variants are public" on product_variants for select using (true);

-- No anon policies on orders: only the server (service role) touches them.

-- Table privileges. Supabase projects normally inherit these from default
-- privileges, but when the tables are created from the SQL editor by a role
-- that lacks them, the service key gets "permission denied for table orders".
-- This block is idempotent — safe to re-run at any time.
grant usage on schema public to anon, authenticated, service_role;

grant select on public.collections, public.products, public.product_variants
  to anon, authenticated, service_role;

grant select, insert, update, delete on public.collections, public.products,
  public.product_variants to service_role;

grant select, insert, update, delete on public.orders to service_role;

