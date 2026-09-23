-- ============================================================================
-- Maison — create (or reset) the first admin account
-- Run this in the Supabase dashboard SQL editor, once.
--
-- 1. Change the two values below: admin_email and admin_password.
-- 2. Press Run. The account is confirmed immediately, no email needed.
-- 3. Sign in at /admin/login with them.
-- 4. Run it again any time to reset that password.
-- ============================================================================

-- Password hashing lives in pgcrypto; Supabase usually keeps it in "extensions".
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

do $$
declare
  admin_email text := 'admin@maison.com';       -- <<< change this
  admin_password text := 'ChangeMe-Strong-123'; -- <<< change this
  admin_id uuid;
  has_provider_id boolean;
  crypto_schema text;
  password_hash text;
begin
  -- Find whichever schema actually holds crypt(text, text).
  select n.nspname
  into crypto_schema
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where p.proname = 'crypt'
    and pg_get_function_identity_arguments(p.oid) = 'text, text'
  order by (n.nspname = 'extensions') desc
  limit 1;

  if crypto_schema is null then
    raise exception 'pgcrypto is not installed. Run: create extension pgcrypto;';
  end if;

  execute format(
    'select %I.crypt($1, %I.gen_salt(''bf''))',
    crypto_schema, crypto_schema
  ) into password_hash using admin_password;

  -- Does this Supabase version have auth.identities.provider_id?
  select exists (
    select 1
    from information_schema.columns
    where table_schema = 'auth'
      and table_name = 'identities'
      and column_name = 'provider_id'
  ) into has_provider_id;

  select id into admin_id from auth.users where lower(email) = lower(admin_email);

  if admin_id is null then
    admin_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      confirmation_token,
      recovery_token,
      email_change,
      email_change_token_new
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      admin_id,
      'authenticated',
      'authenticated',
      lower(admin_email),
      password_hash,
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Workshop admin"}'::jsonb,
      '',
      '',
      '',
      ''
    );
  else
    -- The account exists: reset the password and make sure it can sign in.
    update auth.users
    set encrypted_password = password_hash,
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        updated_at = now()
    where id = admin_id;
  end if;

  -- The email identity row is what makes password sign-in work.
  if has_provider_id then
    insert into auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
    values (
      gen_random_uuid(),
      admin_id,
      admin_id::text,
      jsonb_build_object('sub', admin_id::text, 'email', lower(admin_email)),
      'email',
      now(),
      now(),
      now()
    )
    on conflict do nothing;
  else
    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
    values (
      admin_id::text,
      admin_id,
      jsonb_build_object('sub', admin_id::text, 'email', lower(admin_email)),
      'email',
      now(),
      now(),
      now()
    )
    on conflict do nothing;
  end if;

  raise notice 'Admin ready: % (user id %)', lower(admin_email), admin_id;
end $$;

-- Check it landed. "confirmed" must be true and "identities" must be 1,
-- otherwise sign-in answers "that email and password do not match an account".
select
  u.id,
  u.email,
  u.email_confirmed_at is not null as confirmed,
  (select count(*) from auth.identities i where i.user_id = u.id) as identities
from auth.users u
where lower(u.email) = lower('admin@maison.com'); -- <<< keep in step with admin_email
