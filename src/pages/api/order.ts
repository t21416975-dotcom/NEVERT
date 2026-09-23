import type { APIRoute } from 'astro';
import { adminClient } from '../../lib/db';
import { getProductBySlug } from '../../lib/store';

export const prerender = false;

interface IncomingItem {
  slug: string;
  color: string;
  size: string;
  qty: number;
}

export const POST: APIRoute = async ({ request }) => {
  const supabase = adminClient();
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase || !serviceKey) {
    return json(
      {
        error:
          'Orders are not connected yet. Add your Supabase keys to the environment and try again.',
      },
      503
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'We could not read that order.' }, 400);
  }

  const customer_name = String(body?.customer_name ?? '').trim();
  const whatsapp_number = String(body?.whatsapp_number ?? '').trim();
  const city = String(body?.city ?? '').trim();
  const notes = String(body?.notes ?? '').trim();
  const incoming: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];

  if (!customer_name || !whatsapp_number) {
    return json({ error: 'Please add your name and WhatsApp number.' }, 400);
  }
  if (incoming.length === 0) {
    return json({ error: 'Your bag is empty.' }, 400);
  }

  // Prices and names are read from the catalogue, never trusted from the client.
  const items = [];
  let total = 0;

  for (const line of incoming) {
    const product = await getProductBySlug(String(line.slug ?? ''));
    if (!product) return json({ error: 'One of the pieces is no longer sold.' }, 400);

    const qty = Math.max(1, Math.min(20, Number(line.qty) || 1));
    const variant = product.variants.find(
      (v) => v.color === line.color && v.size === line.size
    );
    if (!variant) {
      return json({ error: `That combination is not available for ${product.name}.` }, 400);
    }

    total += product.price * qty;
    items.push({
      slug: product.slug,
      name: product.name,
      color: variant.color,
      size: variant.size,
      qty,
      unit_price: product.price,
      line_total: product.price * qty,
    });
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name,
      whatsapp_number,
      city: city || null,
      notes: notes || null,
      items,
      total,
      status: 'new',
      source: 'website',
    })
    .select('id')
    .single();

  if (error) {
    return json({ error: 'We could not save your order just now. Please try again.' }, 500);
  }

  return json({ ok: true, order_id: data?.id ?? null, total });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
