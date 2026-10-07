import { useEffect, useState } from 'react';
import { getStoredLang, t as translate, type Lang } from './i18n';

/** Subscribe React islands to the global language. Re-renders on toggle. */
export function useLang() {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(getStoredLang());
    const listener = (e: Event) => setLangState((e as CustomEvent<Lang>).detail);
    window.addEventListener('lang:change', listener);
    return () => window.removeEventListener('lang:change', listener);
  }, []);

  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(key, lang, vars);

  const money = (n: number) => {
    try {
      return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `EGP ${n}`;
    }
  };

  return { lang, t, money };
}
