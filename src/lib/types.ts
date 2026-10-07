export type Lang = 'en' | 'ar';

export interface Variant {
  id?: string;
  color: string;
  color_ar?: string;
  colorHex: string;
  size: string;
  size_ar?: string;
  stock: number;
}

export interface Product {
  id?: string;
  slug: string;
  name: string;
  name_ar?: string;
  price: number;
  description: string;
  description_ar?: string;
  collection: string; // collection slug
  collectionId?: string;
  images: string[];
  variants: Variant[];
  featured?: boolean;
}

export interface Collection {
  id?: string;
  slug: string;
  name: string;
  name_ar?: string;
  tagline: string;
  tagline_ar?: string;
  description: string;
  description_ar?: string;
  cover: string;
  /** Ticked in /admin/collections → shown under "Shop" in the footer. */
  featured?: boolean;
}

export interface OrderLine {
  slug: string;
  name: string;
  color: string;
  size: string;
  qty: number;
  unit_price: number;
  line_total: number;
}

export interface Order {
  id: number;
  customer_name: string;
  whatsapp_number: string;
  city: string | null;
  notes: string | null;
  items: OrderLine[];
  total: number;
  status: OrderStatus;
  created_at: string;
}

export type OrderStatus =
  | 'new'
  | 'contacted'
  | 'confirmed'
  | 'delivered'
  | 'cancelled';

export const ORDER_STATUSES: OrderStatus[] = [
  'new',
  'contacted',
  'confirmed',
  'delivered',
  'cancelled',
];

export const formatPrice = (n: number, lang: Lang = 'en') =>
  new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(n);

/** Pick the Arabic string when active, falling back to English — never blank. */
export const pick = (en: string, ar: string | undefined, lang: Lang): string =>
  lang === 'ar' && ar && ar.trim().length > 0 ? ar : en;

export const pName = (p: Product, lang: Lang): string => pick(p.name, p.name_ar, lang);
export const pDesc = (p: Product, lang: Lang): string =>
  pick(p.description, p.description_ar, lang);
export const cName = (c: Collection, lang: Lang): string => pick(c.name, c.name_ar, lang);
export const cTagline = (c: Collection, lang: Lang): string =>
  pick(c.tagline, c.tagline_ar, lang);
export const cDesc = (c: Collection, lang: Lang): string =>
  pick(c.description, c.description_ar, lang);
export const vColor = (v: Variant, lang: Lang): string =>
  pick(v.color, v.color_ar, lang);
export const vSize = (v: Variant, lang: Lang): string => pick(v.size, v.size_ar, lang);
