import { useEffect, useState } from 'react';
import { cartCount } from '../lib/cart';

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount());
    sync();
    window.addEventListener('cart:change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cart:change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return (
    <a
      href="/cart"
      className="group relative flex items-center gap-2 text-espresso/80 transition-colors hover:text-cognac"
      aria-label={`Your bag, ${count} ${count === 1 ? 'item' : 'items'}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 8h14l-1.2 11.5a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      <span className="text-sm tracking-[0.06em]">Bag</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-white/80 px-1 text-xs tabular-nums text-espresso ring-1 ring-espresso/10"
        >
          {count}
        </span>
      )}
    </a>
  );
}
