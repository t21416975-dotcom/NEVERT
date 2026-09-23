import type { APIRoute } from 'astro';
import { updateOrderStatus } from '../../../../lib/admin-data';
import { ORDER_STATUSES, type OrderStatus } from '../../../../lib/types';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = Number(form.get('id'));
  const status = String(form.get('status') ?? '') as OrderStatus;
  const back = String(form.get('back') ?? '/admin/orders');

  if (!id || !ORDER_STATUSES.includes(status)) {
    return redirect(`${back}?error=status`);
  }

  const result = await updateOrderStatus(id, status);
  if (!result.ok) return redirect(`${back}?error=save`);

  const separator = back.includes('?') ? '&' : '?';
  return redirect(`${back}${separator}saved=1`);
};
