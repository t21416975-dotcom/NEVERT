import { useState } from 'react';
import { addToCart } from '../lib/cart';
import { useLang } from '../lib/useLang';
import { onlyLeft } from '../lib/i18n';

interface Variant {
  color: string;
  color_ar?: string;
  colorHex: string;
  size: string;
  size_ar?: string;
  stock: number;
}

interface Props {
  slug: string;
  name: string;
  name_ar?: string;
  price: number;
  image: string;
  variants: Variant[];
}

const pick = (en: string, ar: string | undefined, lang: 'en' | 'ar') =>
  lang === 'ar' && ar && ar.trim() ? ar : en;

export default function ProductActions({ slug, name, name_ar, price, image, variants }: Props) {
  const { lang, t } = useLang();
  const colors = Array.from(new Set(variants.map((v) => v.color))).map((c) => {
    const v = variants.find((x) => x.color === c)!;
    return { color: c, color_ar: v.color_ar, hex: v.colorHex };
  });
  const sizes = Array.from(new Set(variants.map((v) => v.size))).map((s) => {
    const v = variants.find((x) => x.size === s)!;
    return { size: s, size_ar: v.size_ar };
  });

  const [color, setColor] = useState(colors[0]?.color ?? '');
  const [size, setSize] = useState(sizes[0]?.size ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const activeColor = colors.find((c) => c.color === color);
  const activeSize = sizes.find((s) => s.size === size);

  const stock =
    variants.find((v) => v.color === color && v.size === size)?.stock ?? 0;
  const soldOut = stock === 0;

  function handleAdd() {
    if (soldOut) return;
    addToCart(
      {
        slug,
        name,
        name_ar,
        price,
        image,
        color,
        color_ar: activeColor?.color_ar,
        size,
        size_ar: activeSize?.size_ar,
      },
      qty
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="mt-8">
      <fieldset>
        <legend className="text-sm text-espresso">
          {t('pa.colour')}{' '}
          <span className="text-stone">
            {pick(color, activeColor?.color_ar, lang)}
          </span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.color}
              type="button"
              onClick={() => setColor(c.color)}
              aria-pressed={color === c.color}
              aria-label={pick(c.color, c.color_ar, lang)}
              title={pick(c.color, c.color_ar, lang)}
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
        <legend className="text-sm text-espresso">{t('pa.size')}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s.size}
              type="button"
              onClick={() => setSize(s.size)}
              aria-pressed={size === s.size}
              className={`min-w-[5.5rem] border px-4 py-2 text-sm transition-colors ${
                size === s.size
                  ? 'border-espresso bg-espresso text-porcelain'
                  : 'border-espresso/20 text-espresso hover:border-espresso/50'
              }`}
            >
              {pick(s.size, s.size_ar, lang)}
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
            aria-label={t('pa.dec')}
          >
            −
          </button>
          <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(stock || 1, q + 1))}
            className="px-3 py-2 text-espresso hover:text-cognac"
            aria-label={t('pa.inc')}
          >
            +
          </button>
        </div>
        <p className="text-sm text-stone">
          {soldOut
            ? t('pa.soldout_combo')
            : stock <= 3
              ? onlyLeft(stock, lang)
              : t('pa.instock')}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        className="mt-7 w-full bg-espresso px-8 py-4 text-sm tracking-[0.08em] text-porcelain transition-colors hover:bg-cognac disabled:cursor-not-allowed disabled:bg-stone/40"
      >
        {soldOut ? t('pa.soldout') : added ? t('pa.added') : t('pa.add')}
      </button>
    </div>
  );
}
