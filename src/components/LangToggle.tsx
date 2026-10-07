import { useEffect, useState } from 'react';
import { getStoredLang, setLang, t, type Lang } from '../lib/i18n';

export default function LangToggle() {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(getStoredLang());
    const listener = (e: Event) => setLangState((e as CustomEvent<Lang>).detail);
    window.addEventListener('lang:change', listener);
    return () => window.removeEventListener('lang:change', listener);
  }, []);

  const next: Lang = lang === 'en' ? 'ar' : 'en';
  const ariaKey = lang === 'en' ? 'toggle.toAr' : 'toggle.toEn';

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t(ariaKey, lang)}
      className="header-fg font-body text-sm font-medium tracking-[0.06em] transition-colors duration-500 hover:text-cognac"
    >
      {lang === 'en' ? 'AR' : 'EN'}
    </button>
  );
}
