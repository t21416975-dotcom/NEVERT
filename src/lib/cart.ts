// Client-side cart stored in localStorage, synced via a custom event.
export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  qty: number;
}

const KEY = 'maison-cart-v1';

export function getCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:change'));
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  const items = getCart();
  const found = items.find(
    (i) => i.slug === item.slug && i.color === item.color && i.size === item.size
  );
  if (found) found.qty += qty;
  else items.push({ ...item, qty });
  save(items);
}

export function setQty(slug: string, color: string, size: string, qty: number) {
  const items = getCart();
  const found = items.find(
    (i) => i.slug === slug && i.color === color && i.size === size
  );
  if (!found) return;
  if (qty <= 0) {
    save(items.filter((i) => i !== found));
  } else {
    found.qty = qty;
    save(items);
  }
}

export function removeItem(slug: string, color: string, size: string) {
  save(
    getCart().filter(
      (i) => !(i.slug === slug && i.color === color && i.size === size)
    )
  );
}

export function clearCart() {
  save([]);
}

export function cartCount(): number {
  return getCart().reduce((n, i) => n + i.qty, 0);
}
