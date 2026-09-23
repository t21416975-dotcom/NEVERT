import type { APIRoute } from 'astro';
import { storeSession, signIn } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/admin');

  if (!email || !password) {
    return redirect('/admin/login?error=missing');
  }

  const result = await signIn(email, password);
  if (!result.ok) {
    return redirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  storeSession(cookies, result.access, result.refresh);
  return redirect(next.startsWith('/admin') ? next : '/admin');
};
