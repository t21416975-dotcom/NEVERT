import { defineMiddleware } from 'astro:middleware';
import { currentUser } from './lib/auth';

type Lang = 'en' | 'ar';

/**
 * Proxy-aware host of this request (Vercel terminates TLS at the edge,
 * so the function itself may see http while the browser used https).
 */
function requestHost(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-host');
  if (forwarded) return forwarded.split(',')[0].trim().toLowerCase();
  return new URL(request.url).host.toLowerCase();
}

/**
 * CSRF guard for the admin API (replaces Astro's checkOrigin, which
 * compares full origins and breaks behind proxies). A forged cross-site
 * form always carries the attacker's host in Origin/Referer, so matching
 * hosts — regardless of protocol — blocks CSRF without false positives.
 */
function sameSitePost(request: Request): boolean {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
    return true;
  }
  const source = request.headers.get('origin') ?? request.headers.get('referer');
  if (!source) return true; // non-browser clients send neither; forms always send one
  try {
    return new URL(source).host.toLowerCase() === requestHost(request);
  } catch {
    return false;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Storefront language from the cookie so SSR renders the right language
  // on first paint (no English flash for Arabic shoppers).
  const cookieLang = context.cookies.get('nevert-lang')?.value;
  const lang: Lang = cookieLang === 'ar' ? 'ar' : 'en';
  context.locals.lang = lang;

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isPublicAuth = pathname === '/admin/login' || pathname === '/api/admin/login';

  if (isAdminApi && !sameSitePost(context.request)) {
    return new Response(JSON.stringify({ error: 'Cross-site requests are forbidden.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if ((isAdminPage || isAdminApi) && !isPublicAuth) {
    const user = await currentUser(context.cookies);
    if (!user) {
      if (isAdminApi) {
        return new Response(
          JSON.stringify({ error: 'انتهت الجلسة، سجّل الدخول من جديد.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const target = `${pathname}${context.url.search}`;
      return context.redirect(`/admin/login?next=${encodeURIComponent(target)}`);
    }
    context.locals.admin = user;
  }

  return next();
});
