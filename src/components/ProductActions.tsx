import { useState } from 'react';
import { addToCart } from '../lib/cart';

interface Variant {
  color: string;
  colorHex: string;
  size: string;
  stock: number;
}

interface Props {
  slug: string;
  name: string;
  price: number;
  image: string;
  variants: Variant[];
}

export default function ProductActions({ slug, name, price, image, variants }: Props) {
  const colors = Array.from(new Set(variants.map((v) => v.color))).map((c) => ({
    color: c,
    hex: variants.find((v) => v.color === c)!.colorHex,
  }));
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  const [color, setColor] = useState(colors[0].color);
  const [size, setSize] = useState(sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const stock =
    variants.find((v) => v.color === color && v.size === size)?.stock ?? 0;
  const soldOut = stock === 0;

  function handleAdd() {
    if (soldOut) return;
    addToCart({ slug, name, price, image, color, size }, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="mt-8">
      <fieldset>
        <legend className="text-sm text-espresso">
          Colour{' '}
          <span className="text-stone">{color}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.color}
              type="button"
              onClick={() => setColor(c.color)}
              aria-pressed={color === c.color}
              aria-label={c.color}
              title={c.color}
              className={`h-8 w-8 rounded-full border transition-all ${
                color === c.color
                  ? 'border-cognac ring-1 ring-cognac ring-offset-2 ring-offset-porcelain'
                  : 'border-espresso/20 hover:border-espresso/50'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm text-espresso">Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`min-w-[5.5rem] border px-4 py-2 text-sm transition-colors ${
                size === s
                  ? 'border-espresso bg-espresso text-porcelain'
                  : 'border-espresso/20 text-espresso hover:border-espresso/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex items-center gap-5">
        <div className="flex items-center border border-espresso/20">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-espresso hover:text-cognac"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(stock || 1, q + 1))}
            className="px-3 py-2 text-espresso hover:text-cognac"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="text-sm text-stone">
          {soldOut
            ? 'Sold out in this combination'
            : stock <= 3
              ? `Only ${stock} left in this combination`
              : 'In stock, ships in 3–5 days'}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        className="mt-7 w-full bg-espresso px-8 py-4 text-sm tracking-[0.08em] text-porcelain transition-colors hover:bg-cognac disabled:cursor-not-allowed disabled:bg-stone/40"
      >
        {soldOut ? 'Sold out' : added ? 'Added to your bag' : 'Add to bag'}
      </button>
    </div>
  );
}
