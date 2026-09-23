import type { APIRoute } from 'astro';
import { updateOrderNotes } from '../../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = Number(form.get('id'));
  const notes = String(form.get('notes') ?? '');
  const back = `/admin/orders/${id}`;

  if (!id) return redirect('/admin/orders');

  const result = await updateOrderNotes(id, notes);
  return redirect(result.ok ? `${back}?saved=1` : `${back}?error=save`);
};
