-- NEVERT — bilingual catalogue (run once in Supabase SQL editor).
-- Adds Arabic columns; all nullable so existing rows keep working and
-- the storefront falls back to English when Arabic is empty.

alter table collections
  add column if not exists name_ar text,
  add column if not exists tagline_ar text,
  add column if not exists description_ar text;

alter table products
  add column if not exists name_ar text,
  add column if not exists description_ar text;

alter table product_variants
  add column if not exists color_ar text,
  add column if not exists size_ar text;
