import type { APIRoute } from 'astro';
import { deleteCollection } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim();
  if (!id) return redirect('/admin/collections');

  const result = await deleteCollection(id);
  return redirect(
    result.ok ? '/admin/collections?saved=1' : '/admin/collections?error=save'
  );
};
