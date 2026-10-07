-- NEVERT — featured collections for the footer (run once in Supabase SQL editor).
-- Tick "show in footer" on any collection in /admin/collections and it
-- appears under "Shop" in the storefront footer.

alter table collections
  add column if not exists featured boolean not null default false;
