import type { APIRoute } from 'astro';
import { saveProduct, deleteProduct } from '../../../../lib/admin-data';
import { parseVariantLines, slugify } from '../../../../lib/format';
import type { Variant } from '../../../../lib/types';

export const prerender = false;

const lines = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

interface Payload {
  id?: string;
  name: string;
  name_ar: string;
  slug: string;
  description: string;
  description_ar: string;
  price: number;
  collectionId: string | null;
  images: string[];
  featured: boolean;
  variants: Variant[];
  back: string;
}

/** Structured rows from VariantEditor (v_color, v_hex, …). Empty rows skipped. */
function readVariantRows(form: FormData): Variant[] | null {
  const colors = form.getAll('v_color');
  if (colors.length === 0) return null; // legacy textarea form
  const str = (k: string) => form.getAll(k).map((v) => String(v ?? '').trim());
  const colorAr = str('v_color_ar');
  const hex = str('v_hex');
  const size = str('v_size');
  const sizeAr = str('v_size_ar');
  const stock = str('v_stock');
  const out: Variant[] = [];
  colors.forEach((c, i) => {
    const color = String(c ?? '').trim();
    if (!color) return;
    const h = (hex[i] ?? '').trim();
    out.push({
      color,
      color_ar: colorAr[i] || undefined,
      colorHex: /^#[0-9a-fA-F]{3,8}$/.test(h) ? h : '#CCCCCC',
      size: size[i] || 'Medium',
      size_ar: sizeAr[i] || undefined,
      stock: Math.max(0, Number(stock[i]) || 0),
    });
  });
  return out;
}

function readProduct(form: FormData): Payload {
  const id = String(form.get('id') ?? '').trim() || undefined;
  const name = String(form.get('name') ?? '').trim();
  const rawSlug = String(form.get('slug') ?? '').trim();
  return {
    id,
    name,
    name_ar: String(form.get('name_ar') ?? '').trim(),
    slug: slugify(rawSlug || name),
    description: String(form.get('description') ?? '').trim(),
    description_ar: String(form.get('description_ar') ?? '').trim(),
    price: Number(form.get('price')) || 0,
    collectionId: String(form.get('collectionId') ?? '').trim() || null,
    images: lines(form.get('images')),
    featured: form.get('featured') === 'true',
    variants:
      readVariantRows(form) ?? parseVariantLines(String(form.get('variants') ?? '')),
    back: id ? `/admin/products/${id}` : '/admin/products',
  };
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = readProduct(form);

  if (!payload.name || !payload.slug) {
    return redirect(`${payload.back}?error=name`);
  }

  const result = await saveProduct(payload);
  if (!result.ok) {
    const slugClash = /duplicate|unique/i.test(result.error ?? '');
    return redirect(`${payload.back}?error=${slugClash ? 'slug' : 'save'}`);
  }

  return redirect(`/admin/products/${result.id}?saved=1`);
};
