import type { APIRoute } from 'astro';
import { deleteProduct } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '').trim();
  if (!id) return redirect('/admin/products');

  const result = await deleteProduct(id);
  return redirect(result.ok ? '/admin/products?saved=1' : '/admin/products?error=save');
};
