import type { Collection, Product } from '../lib/types';
export type { Collection, Product };
export { formatPrice } from '../lib/types';

/** Demo catalogue removed: the storefront reads only from Supabase.
 *  Empty arrays keep every lookup helper working (no catalogue = empty shop). */
export const seedCollections: Collection[] = [];

export const seedProducts: Product[] = [];

export const getCollection = (slug: string) =>
  seedCollections.find((c) => c.slug === slug);

export const getProduct = (slug: string) =>
  seedProducts.find((p) => p.slug === slug);

export const productsIn = (collectionSlug: string) =>
  seedProducts.filter((p) => p.collection === collectionSlug);
