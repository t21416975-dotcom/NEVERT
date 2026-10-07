import { adminClient } from './db';
import type { Order, OrderStatus, Variant } from './types';

export interface AdminResult {
  ok: boolean;
  error?: string;
  id?: string | number;
}

/** Orders need the service role key: no anon policy touches that table. */
export function ordersReady(): boolean {
  return Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function listOrders(status?: OrderStatus): Promise<Order[]> {
  const db = adminClient();
  if (!db) return [];
  let query = db
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as Order[];
}

export async function getOrder(id: number): Promise<Order | null> {
  const db = adminClient();
  if (!db) return null;
  const { data, error } = await db
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return null;
  return data as Order;
}

export async function updateOrderStatus(
  id: number,
  status: OrderStatus
): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };
  const { error } = await db.from('orders').update({ status }).eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function updateOrderNotes(
  id: number,
  notes: string
): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };
  const { error } = await db.from('orders').update({ notes }).eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export interface OrderCounts {
  new: number;
  open: number;
  delivered: number;
  cancelled: number;
  revenue: number;
}

export async function orderCounts(): Promise<OrderCounts> {
  const orders = await listOrders();
  const counts: OrderCounts = {
    new: 0,
    open: 0,
    delivered: 0,
    cancelled: 0,
    revenue: 0,
  };
  for (const o of orders) {
    if (o.status === 'new') counts.new += 1;
    if (o.status === 'contacted' || o.status === 'confirmed') counts.open += 1;
    if (o.status === 'delivered') {
      counts.delivered += 1;
      counts.revenue += Number(o.total);
    }
    if (o.status === 'cancelled') counts.cancelled += 1;
  }
  return counts;
}


export async function saveProduct(input: {
  id?: string;
  name: string;
  name_ar?: string;
  slug: string;
  description: string;
  description_ar?: string;
  price: number;
  collectionId: string | null;
  images: string[];
  featured: boolean;
  variants: Variant[];
}): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };

  const row = {
    name: input.name,
    name_ar: input.name_ar || null,
    slug: input.slug,
    description: input.description,
    description_ar: input.description_ar || null,
    price: input.price,
    collection_id: input.collectionId,
    images: input.images,
    featured: input.featured,
  };

  let productId = input.id;

  if (productId) {
    const { error } = await db.from('products').update(row).eq('id', productId);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await db
      .from('products')
      .insert(row)
      .select('id')
      .single();
    if (error || !data) return { ok: false, error: error?.message ?? 'Insert failed.' };
    productId = data.id as string;
  }

  const { error: clearError } = await db
    .from('product_variants')
    .delete()
    .eq('product_id', productId);
  if (clearError) return { ok: false, error: clearError.message };

  if (input.variants.length > 0) {
    const { error: variantError } = await db.from('product_variants').insert(
      input.variants.map((v) => ({
        product_id: productId,
        color: v.color,
        color_ar: v.color_ar ?? null,
        color_hex: v.colorHex,
        size: v.size,
        size_ar: v.size_ar ?? null,
        stock: v.stock,
      }))
    );
    if (variantError) return { ok: false, error: variantError.message };
  }

  return { ok: true, id: productId };
}

export async function deleteProduct(id: string): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };
  const { error } = await db.from('products').delete().eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function saveCollection(input: {
  id?: string;
  name: string;
  name_ar?: string;
  slug: string;
  tagline: string;
  tagline_ar?: string;
  description: string;
  description_ar?: string;
  cover: string;
}): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };
  const row = {
    name: input.name,
    name_ar: input.name_ar || null,
    slug: input.slug,
    tagline: input.tagline,
    tagline_ar: input.tagline_ar || null,
    description: input.description,
    description_ar: input.description_ar || null,
    cover_image: input.cover,
  };
  if (input.id) {
    const { error } = await db.from('collections').update(row).eq('id', input.id);
    return error ? { ok: false, error: error.message } : { ok: true, id: input.id };
  }
  const { data, error } = await db
    .from('collections')
    .insert(row)
    .select('id')
    .single();
  if (error || !data) return { ok: false, error: error?.message ?? 'Insert failed.' };
  return { ok: true, id: data.id as string };
}

export async function deleteCollection(id: string): Promise<AdminResult> {
  const db = adminClient();
  if (!db) return { ok: false, error: 'No database connection.' };
  const { error } = await db.from('collections').delete().eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function listCollectionsAdmin() {
  const db = adminClient();
  if (!db) return [];
  const { data, error } = await db
    .from('collections')
    .select('*')
    .order('name', { ascending: true });
  if (error || !data) return [];
  return data as {
    id: string;
    name: string;
    name_ar: string | null;
    slug: string;
    tagline: string | null;
    tagline_ar: string | null;
    description: string | null;
    description_ar: string | null;
    cover_image: string | null;
  }[];
}
