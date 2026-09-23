export interface Variant {
  id?: string;
  color: string;
  colorHex: string;
  size: string;
  stock: number;
}

export interface Product {
  id?: string;
  slug: string;
  name: string;
  price: number;
  description: string;
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
  tagline: string;
  description: string;
  cover: string;
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

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
