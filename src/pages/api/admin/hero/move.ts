import type { APIRoute } from 'astro';
import { moveHeroSlide } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim();
  const dir = String(form.get('dir') ?? '') === '-1' ? -1 : 1;
  if (id) {
    await moveHeroSlide(id, dir as -1 | 1);
  }
  return redirect('/admin/hero');
};
