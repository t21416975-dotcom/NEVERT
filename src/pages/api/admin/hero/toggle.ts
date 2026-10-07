import type { APIRoute } from 'astro';
import { toggleHeroSlide } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim();
  const active = String(form.get('active') ?? '') === 'true';
  if (id) {
    await toggleHeroSlide(id, active);
  }
  return redirect('/admin/hero');
};
