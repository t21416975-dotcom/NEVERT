import type { APIRoute } from 'astro';
import { saveCollection } from '../../../../lib/admin-data';
import { slugify } from '../../../../lib/format';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim() || undefined;
  const name = String(form.get('name') ?? '').trim();
  const slug = slugify(String(form.get('slug') ?? '').trim() || name);

  if (!name || !slug) {
    return redirect('/admin/collections?error=name');
  }

  const result = await saveCollection({
    id,
    name,
    slug,
    tagline: String(form.get('tagline') ?? '').trim(),
    description: String(form.get('description') ?? '').trim(),
    cover: String(form.get('cover') ?? '').trim(),
  });

  if (!result.ok) {
    const slugClash = /duplicate|unique/i.test(result.error ?? '');
    return redirect(`/admin/collections?error=${slugClash ? 'slug' : 'save'}`);
  }

  return redirect('/admin/collections?saved=1');
};
