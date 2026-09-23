import type { OrderStatus } from './types';

/** Admin panel is Arabic: these are the words the shop owner reads. */
export const orderStatusLabel: Record<OrderStatus, string> = {
  new: 'طلب جديد',
  contacted: 'تم التواصل',
  confirmed: 'مؤكد',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
};

export const shortStatusLabel: Record<OrderStatus, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  confirmed: 'مؤكد',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
};

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ar-EG-u-nu-latn', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('ar-EG-u-nu-latn', {
    dateStyle: 'medium',
  });
}

export function piecesLabel(count: number): string {
  if (count === 1) return 'قطعة واحدة';
  if (count === 2) return 'قطعتان';
  if (count <= 10) return `${count} قطع`;
  return `${count} قطعة`;
}

export function combinationsLabel(count: number): string {
  if (count === 0) return 'بدون ألوان أو أحجام';
  if (count === 1) return 'تركيبة واحدة';
  if (count === 2) return 'تركيبتان';
  return `${count} تركيبات`;
}

export function ordersLabel(count: number): string {
  if (count === 0) return 'لا طلبات';
  if (count === 1) return 'طلب واحد';
  if (count === 2) return 'طلبان';
  return `${count} طلبات`;
}
