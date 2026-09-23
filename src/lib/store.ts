import { publicClient } from './db';
import type { Collection, Product, Variant } from './types';
import {
  seedCollections,
  seedProducts,
} from '../data/catalog';

// The storefront reads through here. If Supabase is configured and holds rows,
// those rows win. Otherwise the starter catalogue in src/data/catalog.ts is used,
// so the site always renders something real.

interface CollectionRow {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  cover_image: string | null;
}

interface ProductRow {
  id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number | string;
  images: string[] | null;
  featured: boolean | null;
}

interface VariantRow {
  id: string;
  product_id: string;
  color: string;
  color_hex: string | null;
  size: string;
  stock: number | null;
}

const toCollection = (r: CollectionRow): Collection => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  tagline: r.tagline ?? '',
  description: r.description ?? '',
  cover: r.cover_image ?? '',
});

const toVariant = (r: VariantRow): Variant => ({
  id: r.id,
  color: r.color,
  colorHex: r.color_hex ?? '#CCCCCC',
  size: r.size,
  stock: r.stock ?? 0,
});

function toProduct(
  r: ProductRow,
  variants: Variant[],
  collectionSlug: string
): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    price: Number(r.price),
    description: r.description ?? '',
    collection: collectionSlug,
    collectionId: r.collection_id ?? undefined,
    images: r.images ?? [],
    variants,
    featured: Boolean(r.featured),
  };
}

export async function listCollections(): Promise<Collection[]> {
  const db = publicClient();
  if (db) {
    const { data, error } = await db
      .from('collections')
      .select('*')
      .order('name', { ascending: true });
    if (!error && data && data.length > 0) {
      return (data as CollectionRow[]).map(toCollection);
    }
  }
  return seedCollections;
}

export async function listProducts(): Promise<Product[]> {
  const db = publicClient();
  if (db) {
    const [products, variants, collections] = await Promise.all([
      db.from('products').select('*').order('created_at', { ascending: true }),
      db.from('product_variants').select('*'),
      db.from('collections').select('id, slug'),
    ]);

    if (!products.error && products.data && products.data.length > 0) {
      const slugById = new Map<string, string>(
        (collections.data ?? []).map((c: { id: string; slug: string }) => [
          c.id,
          c.slug,
        ])
      );
      const variantsByProduct = new Map<string, Variant[]>();
      for (const v of (variants.data ?? []) as VariantRow[]) {
        const list = variantsByProduct.get(v.product_id) ?? [];
        list.push(toVariant(v));
        variantsByProduct.set(v.product_id, list);
      }
      return (products.data as ProductRow[]).map((p) =>
        toProduct(
          p,
          variantsByProduct.get(p.id) ?? [],
          p.collection_id ? (slugById.get(p.collection_id) ?? 'atelier') : 'atelier'
        )
      );
    }
  }
  return seedProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await listProducts();
  return all.find((p) => p.slug === slug);
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | undefined> {
  const all = await listCollections();
  return all.find((c) => c.slug === slug);
}

export async function productsInCollection(slug: string): Promise<Product[]> {
  const all = await listProducts();
  return all.filter((p) => p.collection === slug);
}
