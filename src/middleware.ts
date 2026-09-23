import { defineMiddleware } from 'astro:middleware';
import { currentUser } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isPublicAuth = pathname === '/admin/login' || pathname === '/api/admin/login';

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
