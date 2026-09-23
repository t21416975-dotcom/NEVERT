import type { APIRoute } from 'astro';
import { saveProduct, deleteProduct } from '../../../../lib/admin-data';
import { parseVariantLines, slugify } from '../../../../lib/format';

export const prerender = false;

const lines = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

interface Payload {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  collectionId: string | null;
  images: string[];
  featured: boolean;
  variants: ReturnType<typeof parseVariantLines>;
  back: string;
}

function readProduct(form: FormData): Payload {
  const id = String(form.get('id') ?? '').trim() || undefined;
  const name = String(form.get('name') ?? '').trim();
  const rawSlug = String(form.get('slug') ?? '').trim();
  return {
    id,
    name,
    slug: slugify(rawSlug || name),
    description: String(form.get('description') ?? '').trim(),
    price: Number(form.get('price')) || 0,
    collectionId: String(form.get('collectionId') ?? '').trim() || null,
    images: lines(form.get('images')),
    featured: form.get('featured') === 'true',
    variants: parseVariantLines(String(form.get('variants') ?? '')),
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
