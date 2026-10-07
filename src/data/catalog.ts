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
    name_ar: 'الأتيليه',
    tagline: 'Structured silhouettes, cut by hand',
    tagline_ar: 'قوامات مهيكلة تُقص يدوياً',
    description:
      'Our signature line. Firm vegetable-tanned leather shaped into clean, architectural forms that hold their shape for decades.',
    description_ar:
      'خطنا المميز. جلد صلب مدبوغ نباتياً يتشكل في قوالب نظيفة معمارية تحافظ على شكلها لعقود.',
    cover: img('collection-atelier', 1200, 900),
  },
  {
    slug: 'soft-carry',
    name: 'Soft Carry',
    name_ar: 'الحمل الناعم',
    tagline: 'Supple leather that moves with you',
    tagline_ar: 'جلد طري يتحرك معك',
    description:
      'Unlined, featherlight bags in butter-soft hides. Made for days that do not follow a schedule.',
    description_ar:
      'حقائب خفيفة بدون بطانة من جلد ناعم كالزبدة. صُنعت للأيام التي لا تلتزم بجدول.',
    cover: img('collection-soft', 1200, 900),
  },
  {
    slug: 'evening',
    name: 'Evening',
    name_ar: 'السهرة',
    tagline: 'Small pieces for late hours',
    tagline_ar: 'قطع صغيرة لساعات متأخرة',
    description:
      'Miniatures and clutches finished with hand-set hardware. The quietest statement in the room.',
    description_ar:
      'قطع مصغرة وكلاتشات منتهية بإكسسوارات مركبة يدوياً. أهدأ حضور في المكان.',
    cover: img('collection-evening', 1200, 900),
  },
];

const colors = [
  { color: 'Cognac', color_ar: 'كونياك', colorHex: '#A67B4F' },
  { color: 'Espresso', color_ar: 'بني داكن', colorHex: '#2B2620' },
  { color: 'Sand', color_ar: 'رملي', colorHex: '#D9CBB4' },
  { color: 'Sage', color_ar: 'مريمية', colorHex: '#9CA08C' },
];
const sizes = [
  { size: 'Small', size_ar: 'صغير' },
  { size: 'Medium', size_ar: 'وسط' },
  { size: 'Large', size_ar: 'كبير' },
];

function variantsFor(stockBase: number): Variant[] {
  const out: Variant[] = [];
  colors.forEach((c, ci) =>
    sizes.forEach((s, si) =>
      out.push({
        color: c.color,
        color_ar: c.color_ar,
        colorHex: c.colorHex,
        size: s.size,
        size_ar: s.size_ar,
        stock: Math.max(0, stockBase - ((ci + si) % 3)),
      })
    )
  );
  return out;
}

export const seedProducts: Product[] = [
  {
    slug: 'saddle-tote',
    name: 'Saddle Tote',
    name_ar: 'حقيبة السرج',
    price: 44500,
    description:
      'A single hide, folded and saddle-stitched over three days. Carries a laptop, a novel, and everything between.',
    description_ar:
      'جلد واحد يُطوى ويُخاط بغرز السرج على مدى ثلاثة أيام. تتسع للابتوب ورواية وكل ما بينهما.',
    collection: 'atelier',
    images: [img('bag-saddle-1'), img('bag-saddle-2'), img('bag-saddle-3')],
    variants: variantsFor(6),
    featured: true,
  },
  {
    slug: 'frame-bag',
    name: 'Frame Bag',
    name_ar: 'حقيبة الإطار',
    price: 57500,
    description:
      'Built on a brass frame cast in a family foundry. Opens wide, closes with a soft click.',
    description_ar:
      'مبنية على إطار نحاسي مصبوب في مسبك عائلي. تُفتح على وسعها وتُغلق بطقة ناعمة.',
    collection: 'atelier',
    images: [img('bag-frame-1'), img('bag-frame-2'), img('bag-frame-3')],
    variants: variantsFor(4),
    featured: true,
  },
  {
    slug: 'wander-hobo',
    name: 'Wander Hobo',
    name_ar: 'حقيبة التجوال',
    price: 32000,
    description:
      'Unstructured and unlined. The leather creases where you crease, and softens where you hold it.',
    description_ar:
      'بدون هيكل ولا بطانة. يتجعّد الجلد حيث تتجعّد، ويلين حيث تمسكه.',
    collection: 'soft-carry',
    images: [img('bag-hobo-1'), img('bag-hobo-2'), img('bag-hobo-3')],
    variants: variantsFor(8),
    featured: true,
  },
  {
    slug: 'petite-crossbody',
    name: 'Petite Crossbody',
    name_ar: 'كروس صغيرة',
    price: 24000,
    description:
      'Phone, cards, keys, one lipstick. A hand-braided strap and nothing you do not need.',
    description_ar:
      'هاتف وبطاقات ومفاتيح وأحمر شفاه واحد. حزام مضفر يدوياً ولا شيء زائد عن حاجتك.',
    collection: 'soft-carry',
    images: [img('bag-cross-1'), img('bag-cross-2'), img('bag-cross-3')],
    variants: variantsFor(10),
  },
  {
    slug: 'minaudiere',
    name: 'Minaudière',
    name_ar: 'حقيبة السهرة',
    price: 49000,
    description:
      'A rigid evening case wrapped in silk-lined leather, closed by a hand-set clasp. Holds the essentials of a long night.',
    description_ar:
      'علبة سهرة صلبة مغلفة بجلد مبطن بالحرير، تُغلق بقفل مركب يدوياً. تتسع لأساسيات ليلة طويلة.',
    collection: 'evening',
    images: [img('bag-minaud-1'), img('bag-minaud-2'), img('bag-minaud-3')],
    variants: variantsFor(3),
    featured: true,
  },
  {
    slug: 'envelope-clutch',
    name: 'Envelope Clutch',
    name_ar: 'كلاتش الظرف',
    price: 26000,
    description:
      'One piece of leather, three folds, two stitches per centimetre. Slips under the arm and stays there.',
    description_ar:
      'قطعة جلد واحدة، ثلاث طيات، غرزتان في كل سنتيمتر. تنزلق تحت الذراع وتبقى هناك.',
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
