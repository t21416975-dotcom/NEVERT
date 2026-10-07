import type { APIRoute } from 'astro';
import { saveHeroSlide } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const image = String(form.get('image') ?? '').trim();
  if (!image) {
    return redirect('/admin/hero?error=image');
  }
  const result = await saveHeroSlide({
    image,
    alt_en: String(form.get('alt_en') ?? '').trim(),
    alt_ar: String(form.get('alt_ar') ?? '').trim(),
  });
  return redirect(result.ok ? '/admin/hero?saved=1#new' : '/admin/hero?error=save');
};
