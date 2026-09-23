import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

/** Catalogue reads work with the anon key; orders and admin writes need the service key. */
export const hasDb = Boolean(url && anonKey);
export const hasServiceRole = Boolean(url && serviceKey);

const options = { auth: { persistSession: false, autoRefreshToken: false } };

export function publicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, options);
}

/** Server-only client. Falls back to the anon key so the app still runs before setup. */
export function adminClient(): SupabaseClient | null {
  if (!url) return null;
  if (serviceKey) return createClient(url, serviceKey, options);
  if (anonKey) return createClient(url, anonKey, options);
  return null;
}
