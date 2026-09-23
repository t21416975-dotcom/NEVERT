import type { Variant } from './types';

export const WHATSAPP_FALLBACK = '';

/** Countries default to Egypt here; the admin can paste any full number. */
export function waLink(rawNumber: string, message: string): string {
  const digits = rawNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(
  order: {
    id: number;
    customer_name: string;
    items: { name: string; color: string; size: string; qty: number }[];
    total: number;
  },
  shopName = 'NEVERT'
): string {
  const lines = order.items
    .map((i) => `• ${i.name} — ${i.color}، ${i.size} × ${i.qty}`)
    .join('\n');
  return [
    `مرحبًا ${order.customer_name}، معك ${shopName}.`,
    `بخصوص طلبك رقم #${order.id}:`,
    lines,
    `الإجمالي: $${order.total}`,
    'نأكد معك اللون وعنوان التوصيل؟',
  ].join('\n');
}

export function stockFor(variants: Variant[], color: string, size: string): number {
  return variants.find((v) => v.color === color && v.size === size)?.stock ?? 0;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** "Cognac #A67B4F | Medium | 4" per line, one variant per line. */
export function parseVariantLines(input: string): Variant[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, sizePart, stockPart] = line.split('|').map((s) => s.trim());
      const hexMatch = (namePart ?? '').match(/#([0-9a-fA-F]{3,8})\b/);
      const color = (namePart ?? '').replace(/#[0-9a-fA-F]{3,8}/, '').trim();
      return {
        color: color || 'Natural',
        colorHex: hexMatch ? `#${hexMatch[1]}` : '#CCCCCC',
        size: sizePart || 'Medium',
        stock: Number(stockPart) || 0,
      };
    })
    .filter((v) => v.color.length > 0);
}

export function variantsToLines(variants: Variant[]): string {
  return variants
    .map((v) => `${v.color} ${v.colorHex} | ${v.size} | ${v.stock}`)
    .join('\n');
}
