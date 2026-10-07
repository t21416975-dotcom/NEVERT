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

const msg = {
  noDb: {
    en: 'Orders are not connected yet. Add your Supabase keys to the environment and try again.',
    ar: 'الطلبات غير مربوطة بعد. أضف مفاتيح Supabase إلى البيئة وحاول مجدداً.',
  },
  unreadable: {
    en: 'We could not read that order.',
    ar: 'تعذر قراءة هذا الطلب.',
  },
  missingName: {
    en: 'Please add your name and WhatsApp number.',
    ar: 'فضلاً أضف اسمك ورقم الواتساب.',
  },
  empty: {
    en: 'Your bag is empty.',
    ar: 'حقيبتك فارغة.',
  },
  gone: {
    en: 'One of the pieces is no longer sold.',
    ar: 'إحدى القطع لم تعد متوفرة.',
  },
  combo: (name: string) => ({
    en: `That combination is not available for ${name}.`,
    ar: `هذه التركيبة غير متوفرة لـ ${name}.`,
  }),
  saveFail: {
    en: 'We could not save your order just now. Please try again.',
    ar: 'تعذر حفظ طلبك الآن. حاول مجدداً.',
  },
} as const;

export const POST: APIRoute = async ({ request }) => {
  const supabase = adminClient();
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: msg.unreadable.en }, 400);
  }

  const ar = body?.lang === 'ar';
  const pick = (m: { en: string; ar: string }) => (ar ? m.ar : m.en);

  if (!supabase || !serviceKey) {
    return json({ error: pick(msg.noDb) }, 503);
  }

  const customer_name = String(body?.customer_name ?? '').trim();
  const whatsapp_number = String(body?.whatsapp_number ?? '').trim();
  const city = String(body?.city ?? '').trim();
  const notes = String(body?.notes ?? '').trim();
  const incoming: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];

  if (!customer_name || !whatsapp_number) {
    return json({ error: pick(msg.missingName) }, 400);
  }
  if (incoming.length === 0) {
    return json({ error: pick(msg.empty) }, 400);
  }

  // Prices and names are read from the catalogue, never trusted from the client.
  const items = [];
  let total = 0;

  for (const line of incoming) {
    const product = await getProductBySlug(String(line.slug ?? ''));
    if (!product) return json({ error: pick(msg.gone) }, 400);

    const qty = Math.max(1, Math.min(20, Number(line.qty) || 1));
    const variant = product.variants.find(
      (v) => v.color === line.color && v.size === line.size
    );
    if (!variant) {
      const name = ar && product.name_ar ? product.name_ar : product.name;
      return json({ error: pick(msg.combo(name)) }, 400);
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
    return json({ error: pick(msg.saveFail) }, 500);
  }

  return json({ ok: true, order_id: data?.id ?? null, total });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
