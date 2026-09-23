import type { Collection, Product, Variant } from '../lib/types';
export type { Collection, Product, Variant };
export { formatPrice } from '../lib/types';

const img = (seed: string, w = 900, h = 1100) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Starter catalogue. It seeds Supabase, and doubles as the fallback when no keys are set. */
export const seedCollections: Collection[] = [
  {
    slug: 'atelier',
    name: 'Atelier',
    tagline: 'Structured silhouettes, cut by hand',
    description:
      'Our signature line. Firm vegetable-tanned leather shaped into clean, architectural forms that hold their shape for decades.',
    cover: img('collection-atelier', 1200, 900),
  },
  {
    slug: 'soft-carry',
    name: 'Soft Carry',
    tagline: 'Supple leather that moves with you',
    description:
      'Unlined, featherlight bags in butter-soft hides. Made for days that do not follow a schedule.',
    cover: img('collection-soft', 1200, 900),
  },
  {
    slug: 'evening',
    name: 'Evening',
    tagline: 'Small pieces for late hours',
    description:
      'Miniatures and clutches finished with hand-set hardware. The quietest statement in the room.',
    cover: img('collection-evening', 1200, 900),
  },
];

const colors = [
  { color: 'Cognac', colorHex: '#A67B4F' },
  { color: 'Espresso', colorHex: '#2B2620' },
  { color: 'Sand', colorHex: '#D9CBB4' },
  { color: 'Sage', colorHex: '#9CA08C' },
];
const sizes = ['Small', 'Medium', 'Large'];

function variantsFor(stockBase: number): Variant[] {
  const out: ProductVariant[] = [];
  colors.forEach((c, ci) =>
    sizes.forEach((size, si) =>
      out.push({ ...c, size, stock: Math.max(0, stockBase - ((ci + si) % 3)) })
    )
  );
  return out;
}

export const seedProducts: Product[] = [
  {
    slug: 'saddle-tote',
    name: 'Saddle Tote',
    price: 890,
    description:
      'A single hide, folded and saddle-stitched over three days. Carries a laptop, a novel, and everything between.',
    collection: 'atelier',
    images: [img('bag-saddle-1'), img('bag-saddle-2'), img('bag-saddle-3')],
    variants: variantsFor(6),
    featured: true,
  },
  {
    slug: 'frame-bag',
    name: 'Frame Bag',
    price: 1150,
    description:
      'Built on a brass frame cast in a family foundry. Opens wide, closes with a soft click.',
    collection: 'atelier',
    images: [img('bag-frame-1'), img('bag-frame-2'), img('bag-frame-3')],
    variants: variantsFor(4),
    featured: true,
  },
  {
    slug: 'wander-hobo',
    name: 'Wander Hobo',
    price: 640,
    description:
      'Unstructured and unlined. The leather creases where you crease, and softens where you hold it.',
    collection: 'soft-carry',
    images: [img('bag-hobo-1'), img('bag-hobo-2'), img('bag-hobo-3')],
    variants: variantsFor(8),
    featured: true,
  },
  {
    slug: 'petite-crossbody',
    name: 'Petite Crossbody',
    price: 480,
    description:
      'Phone, cards, keys, one lipstick. A hand-braided strap and nothing you do not need.',
    collection: 'soft-carry',
    images: [img('bag-cross-1'), img('bag-cross-2'), img('bag-cross-3')],
    variants: variantsFor(10),
  },
  {
    slug: 'minaudiere',
    name: 'Minaudière',
    price: 980,
    description:
      'A rigid evening case wrapped in silk-lined leather, closed by a hand-set clasp. Holds the essentials of a long night.',
    collection: 'evening',
    images: [img('bag-minaud-1'), img('bag-minaud-2'), img('bag-minaud-3')],
    variants: variantsFor(3),
    featured: true,
  },
  {
    slug: 'envelope-clutch',
    name: 'Envelope Clutch',
    price: 520,
    description:
      'One piece of leather, three folds, two stitches per centimetre. Slips under the arm and stays there.',
    collection: 'evening',
    images: [img('bag-env-1'), img('bag-env-2'), img('bag-env-3')],
    variants: variantsFor(7),
  },
];

export const getCollection = (slug: string) =>
  seedCollections.find((c) => c.slug === slug);

export const getProduct = (slug: string) =>
  seedProducts.find((p) => p.slug === slug);

export const productsIn = (collectionSlug: string) =>
  seedProducts.filter((p) => p.collection === collectionSlug);
