import type { AstroCookies } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { publicClient } from './db';

const ACCESS_COOKIE = 'maison_admin_access';
const REFRESH_COOKIE = 'maison_admin_refresh';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const authReady = Boolean(url && anonKey);

function cookieOptions(maxAge: number) {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: import.meta.env.PROD,
    maxAge,
  };
}

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: true; access: string; refresh: string } | { ok: false; error: string }> {
  if (!url || !anonKey) {
    return {
      ok: false,
      error:
        'Sign in is not connected yet. Add your Supabase URL and anon key to the environment.',
    };
  }

  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return { ok: false, error: 'That email and password do not match an account.' };
  }

  return {
    ok: true,
    access: data.session.access_token,
    refresh: data.session.refresh_token,
  };
}

export function storeSession(cookies: AstroCookies, access: string, refresh: string) {
  cookies.set(ACCESS_COOKIE, access, cookieOptions(60 * 60));
  cookies.set(REFRESH_COOKIE, refresh, cookieOptions(60 * 60 * 24 * 30));
}

export function clearSession(cookies: AstroCookies) {
  cookies.delete(ACCESS_COOKIE, { path: '/' });
  cookies.delete(REFRESH_COOKIE, { path: '/' });
}

export interface AdminUser {
  id: string;
  email: string;
}

/** Validates the access cookie against Supabase and refreshes it when it has expired. */
export async function currentUser(cookies: AstroCookies): Promise<AdminUser | null> {
  const access = cookies.get(ACCESS_COOKIE)?.value;
  const refresh = cookies.get(REFRESH_COOKIE)?.value;
  const client = publicClient();
  if (!client) return null;

  if (access) {
    const { data, error } = await client.auth.getUser(access);
    if (!error && data.user?.email) {
      return { id: data.user.id, email: data.user.email };
    }
  }

  if (refresh) {
    const refreshed = await refreshSession(refresh, cookies);
    if (refreshed) return refreshed;
  }

  return null;
}

async function refreshSession(
  refreshToken: string,
  cookies: AstroCookies
): Promise<AdminUser | null> {
  if (!url || !anonKey) return null;
  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.refreshSession({
    refresh_token: refreshToken,
  });
  if (error || !data.session || !data.user?.email) {
    clearSession(cookies);
    return null;
  }
  storeSession(cookies, data.session.access_token, data.session.refresh_token);
  return { id: data.user.id, email: data.user.email };
}
