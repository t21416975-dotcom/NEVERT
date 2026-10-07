import { useEffect, useState } from 'react';
import { getCart, setQty, removeItem, clearCart, type CartItem } from '../lib/cart';
import { useLang } from '../lib/useLang';

const dispName = (i: CartItem, lang: 'en' | 'ar') =>
  lang === 'ar' && i.name_ar && i.name_ar.trim() ? i.name_ar : i.name;
const dispColor = (i: CartItem, lang: 'en' | 'ar') =>
  lang === 'ar' && i.color_ar && i.color_ar.trim() ? i.color_ar : i.color;
const dispSize = (i: CartItem, lang: 'en' | 'ar') =>
  lang === 'ar' && i.size_ar && i.size_ar.trim() ? i.size_ar : i.size;

export default function CartPage({ whatsapp = '' }: { whatsapp?: string }) {
  const { lang, t, money } = useLang();
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    setReady(true);
    window.addEventListener('cart:change', sync);
    return () => window.removeEventListener('cart:change', sync);
  }, []);

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          whatsapp_number: phone,
          city,
          notes,
          lang,
          items: items.map((i) => ({
            slug: i.slug,
            color: i.color,
            size: i.size,
            qty: i.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? t('cart.err.send'));
      setOrderId(data.order_id ?? null);
      clearCart();
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : t('cart.err.generic'));
    }
  }

  if (ready && status === 'sent') {
    const lines = items.map(
      (i) => `${dispName(i, lang)} — ${dispColor(i, lang)}، ${dispSize(i, lang)} × ${i.qty}`
    );
    const message =
      lang === 'ar'
        ? `مرحباً، أرسلت الطلب ${orderId ? `#${orderId}` : ''} من الموقع:\n${lines.join('\n')}`
        : `Hello, I placed order ${orderId ? `#${orderId}` : ''} on the site:\n${lines.join('\n')}`;
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="font-display text-3xl text-espresso sm:text-4xl">
          {t('cart.sent.title')}
        </h1>
        <p className="mt-5 leading-relaxed text-stone">
          {orderId
            ? lang === 'ar'
              ? `رقم الطلب ${orderId}. `
              : `Order number ${orderId}. `
            : ''}
          {lang === 'ar'
            ? `سنراسل ${phone || 'ك'} على واتساب لتأكيد اللون والمبلغ الإجمالي والتوصيل.`
            : `We will message ${phone || 'you'} on WhatsApp to confirm the colour, the total and delivery.`}
        </p>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block bg-espresso px-8 py-3.5 text-sm tracking-[0.08em] text-porcelain transition-colors hover:bg-cognac"
          >
            {t('cart.wa.open')}
          </a>
        )}
        <p className="mt-8 text-sm text-stone">
          <a
            href="/collections"
            className="underline decoration-stone/30 underline-offset-4 hover:text-cognac"
          >
            {t('cart.sent.keep')}
          </a>
        </p>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="font-display text-3xl text-espresso sm:text-4xl">
          {t('cart.empty.title')}
        </h1>
        <p className="mt-5 leading-relaxed text-stone">{t('cart.empty.body')}</p>
        <a
          href="/collections"
          className="mt-8 inline-block bg-espresso px-8 py-3.5 text-sm tracking-[0.08em] text-porcelain transition-colors hover:bg-cognac"
        >
          {t('cart.empty.cta')}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-espresso sm:text-5xl">{t('cart.title')}</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-stone">{t('cart.sub')}</p>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
          {items.map((i) => (
            <li key={`${i.slug}-${i.color}-${i.size}`} className="flex gap-5 py-6">
              <a
                href={`/products/${i.slug}`}
                className="block w-24 shrink-0 overflow-hidden bg-linen sm:w-28"
              >
                <img
                  src={i.image}
                  alt={dispName(i, lang)}
                  width="300"
                  height="375"
                  className="aspect-[4/5] w-full object-cover"
                />
              </a>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <a
                      href={`/products/${i.slug}`}
                      className="font-display text-lg text-espresso hover:text-cognac"
                    >
                      {dispName(i, lang)}
                    </a>
                    <p className="text-sm tabular-nums text-stone">
                      {money(i.price * i.qty)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-stone">
                    {dispColor(i, lang)} · {dispSize(i, lang)}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <div className="flex items-center border border-espresso/20">
                    <button
                      type="button"
                      onClick={() => setQty(i.slug, i.color, i.size, i.qty - 1)}
                      className="px-3 py-1.5 text-espresso hover:text-cognac"
                      aria-label={`${t('pa.dec')} ${dispName(i, lang)}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {i.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(i.slug, i.color, i.size, i.qty + 1)}
                      className="px-3 py-1.5 text-espresso hover:text-cognac"
                      aria-label={`${t('pa.inc')} ${dispName(i, lang)}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i.slug, i.color, i.size)}
                    className="text-sm text-stone underline decoration-stone/30 underline-offset-4 hover:text-cognac"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={submit} className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-baseline justify-between border-b border-espresso/10 pb-5">
            <span className="text-espresso">{t('cart.subtotal')}</span>
            <span className="font-display text-2xl tabular-nums text-espresso">
              {money(subtotal)}
            </span>
          </div>
          <p className="mt-4 text-sm text-stone">{t('cart.delivery_note')}</p>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-espresso">
                {t('cart.name')}
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-espresso/20 bg-porcelain px-4 py-3 text-sm outline-none transition-colors focus:border-cognac"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-espresso">
                {t('cart.phone')}
              </label>
              <input
                id="phone"
                required
                inputMode="tel"
                placeholder="+20 100 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-espresso/20 bg-porcelain px-4 py-3 text-sm outline-none transition-colors focus:border-cognac"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm text-espresso">
                {t('cart.city')}
              </label>
              <input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full border border-espresso/20 bg-porcelain px-4 py-3 text-sm outline-none transition-colors focus:border-cognac"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm text-espresso">
                {t('cart.notes')}
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('cart.notes_ph')}
                className="mt-2 w-full border border-espresso/20 bg-porcelain px-4 py-3 text-sm outline-none transition-colors focus:border-cognac"
              />
            </div>
          </div>

          {status === 'error' && (
            <p
              role="alert"
              className="mt-6 border border-cognac/40 bg-cognac/5 px-4 py-3 text-sm text-espresso"
            >
              {error} {t('cart.error_suffix')}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-8 w-full bg-espresso px-8 py-4 text-sm tracking-[0.08em] text-porcelain transition-colors hover:bg-cognac disabled:cursor-not-allowed disabled:bg-stone/40"
          >
            {status === 'sending' ? t('cart.sending') : t('cart.send')}
          </button>
          <p className="mt-3 text-xs text-stone">{t('cart.agree')}</p>
        </form>
      </div>
    </div>
  );
}
