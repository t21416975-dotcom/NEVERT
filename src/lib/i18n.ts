export type Lang = 'en' | 'ar';

const STORAGE_KEY = 'nevert-lang';

export const dict: Record<string, { en: string; ar: string }> = {
  // nav + header
  'nav.collections': { en: 'Collections', ar: 'المجموعات' },
  'nav.atelier': { en: 'The atelier', ar: 'المشغل' },
  'nav.contact': { en: 'Contact', ar: 'تواصل' },
  // cart
  'bag.label': { en: 'Bag', ar: 'الحقيبة' },
  // footer
  'footer.tagline': {
    en: 'Bags cut, stitched and finished by four pairs of hands in a small workshop. No assembly lines.',
    ar: 'شنط تقص وتخاط وتنهى بأربع أيدٍ في مشغل صغير. لا خطوط إنتاج.',
  },
  'footer.shop': { en: 'Shop', ar: 'تسوق' },
  'footer.questions': { en: 'Questions', ar: 'أسئلة' },
    'footer.bag': { en: 'Your bag', ar: 'حقيبتك' },
  'footer.contact': { en: 'Contact us', ar: 'تواصل معنا' },
  'footer.note': { en: 'Orders are confirmed over WhatsApp.', ar: 'تؤكد الطلبات عبر واتساب.' },
  // toggle button aria
  'toggle.toAr': { en: 'Switch to Arabic', ar: 'Switch to Arabic' },
  'toggle.toEn': { en: 'Switch to English', ar: 'Switch to English' },
  // homepage hero
  'hero.kicker': { en: 'Handcrafted, one at a time', ar: 'يدوي، قطعة بقطعة' },
  'hero.title': { en: 'Six bags, made slowly', ar: 'ست شنط، صُنعت ببطء' },
  'hero.sub': {
    en: 'Every piece is cut from a single hide and closed by hand, one stitch at a time. What leaves the workshop is meant to outlast the season it was bought in.',
    ar: 'كل قطعة تقص من جلد واحد وتغلق يدوياً غرزةً بغرزة. ما يخرج من المشغل صُنع ليبقى أطول من الموسم الذي اشتريته فيه.',
  },
  'hero.cta1': { en: 'See the collections', ar: 'شاهد المجموعات' },
  'hero.cta2': { en: 'How they are made', ar: 'كيف تُصنع' },
  'hero.scroll': { en: 'Scroll', ar: 'مرّر' },
  // home sections
  'home.collections': { en: 'Collections', ar: 'المجموعات' },
  'home.featured': { en: 'From the bench this month', ar: 'من العارضة هذا الشهر' },
  'home.all': { en: 'All six pieces', ar: 'كل القطع الست' },
  'home.materials.title': { en: 'Vegetable-tanned hides, brass that patinas, thread that holds', ar: 'جلود مموعة نباتياً، نحاس يتلون، خيط يصمد' },
  'home.materials.sub': {
    en: "We buy from two tanneries, both under a day's drive from the workshop. Nothing is bonded, nothing is coated. The leather darkens in sunlight and the brass settles into a warmer tone with use.",
    ar: 'نتعامل مع مدبغتين، كلتاهما بعيدة أقل من يوم بالسيارة من المشغل. لا شيء مركب ولا مغطّى. الجلد يغمق تحت أشعة الشمس والنحاس يتحمر برفقة مع الاستعمال.',
  },
  'home.materials.days': { en: 'Days per bag', ar: 'أيام لكل شنطة' },
  'home.materials.hands': { en: 'Hands in the workshop', ar: 'أيدٍ في المشغل' },
  'home.order.title': { en: 'Ordering takes two minutes', ar: 'الطلب يأخذ دقيقتين' },
  'home.order.step1.title': { en: 'Choose colour and size', ar: 'اختر اللون والمقاس' },
  'home.order.step1.body': { en: 'Add the pieces you want to your bag. Nothing is charged online.', ar: 'أضف القطع التي تريدها إلى حقيبتك. لا يتم دفع أي مبلغ أونلاين.' },
  'home.order.step2.title': { en: 'Send us your details', ar: 'أرسل لنا بياناتك' },
  'home.order.step2.body': { en: 'Your name, WhatsApp number and where the bag is going.', ar: 'اسمك، رقم الواتساب، ومكان توصيل الحقيبة.' },
  'home.order.step3.title': { en: 'We message you', ar: 'نرسل لك رسالة' },
  'home.order.step3.body': { en: 'We confirm the piece, the total and delivery, then it goes to the bench.', ar: 'نؤكد القطعة والمجموع والتوصيل، ثم تنتقل إلى العارضة.' },
  'home.from': { en: 'Pieces start at', ar: 'تبدأ الأسعار من' },
};

export function getStoredLang(): Lang {
  if (typeof localStorage === 'undefined') return 'en';
  return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
}

// Set document lang/dir and swap every [data-i18n] node to the active language.
export function applyLang(lang: Lang): void {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) el.textContent = dict[key][lang];
  });
}

// Persist preference, fade main+footer for a smooth swap, then re-render.
export function setLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  document.body.classList.add('lang-fading');
  window.setTimeout(() => {
    applyLang(lang);
    document.body.classList.remove('lang-fading');
    window.dispatchEvent(new CustomEvent<Lang>('lang:change', { detail: lang }));
  }, 150);
}
