import type { APIRoute } from 'astro';
import { deleteHeroSlide } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim();
  if (!id) {
    return redirect('/admin/hero?error=save');
  }
  const result = await deleteHeroSlide(id);
  return redirect(result.ok ? '/admin/hero?saved=1' : '/admin/hero?error=save');
};
