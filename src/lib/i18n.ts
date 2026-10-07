export type Lang = 'en' | 'ar';

const STORAGE_KEY = 'nevert-lang';
const COOKIE_KEY = 'nevert-lang';

export const dict: Record<string, { en: string; ar: string }> = {
  // nav + header
  'nav.collections': { en: 'Collections', ar: 'المجموعات' },
  'nav.about': { en: 'About us', ar: 'من نحن' },
  'nav.contact': { en: 'Contact', ar: 'تواصل' },
  // cart badge
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
  // toggle
  'toggle.toAr': { en: 'Switch to Arabic', ar: 'التبديل إلى العربية' },
  'toggle.toEn': { en: 'Switch to English', ar: 'التبديل إلى الإنجليزية' },
  'toggle.short': { en: 'EN', ar: 'عربي' },
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
  'hero.slide': { en: 'Show slide {count}', ar: 'عرض الشريحة {count}' },
  // home sections
  'home.collections': { en: 'Collections', ar: 'المجموعات' },
  'home.featured': { en: 'From the bench this month', ar: 'من العارضة هذا الشهر' },
  'home.all': { en: 'All six pieces', ar: 'كل القطع' },
  'home.materials.title': {
    en: 'Vegetable-tanned hides, brass that patinas, thread that holds',
    ar: 'جلود مدبوغة نباتياً، نحاس يكتسب لوناً مع الزمن، وخيط يصمد',
  },
  'home.materials.sub': {
    en: "We buy from two tanneries, both under a day's drive from the workshop. Nothing is bonded, nothing is coated. The leather darkens in sunlight and the brass settles into a warmer tone with use.",
    ar: 'نشتري من مدبغتين، كلتاهما على بعد أقل من يوم بالسيارة من المشغل. لا شيء ملصق ولا مطلي. الجلد يغمق تحت الشمس والنحاس يزداد دفئاً مع الاستعمال.',
  },
  'home.materials.days': { en: 'Days per bag', ar: 'أيام لكل شنطة' },
  'home.materials.hands': { en: 'Hands in the workshop', ar: 'أيدٍ في المشغل' },
  'home.order.title': { en: 'Ordering takes two minutes', ar: 'الطلب يأخذ دقيقتين' },
  'home.order.step1.title': { en: 'Choose colour and size', ar: 'اختر اللون والمقاس' },
  'home.order.step1.body': {
    en: 'Add the pieces you want to your bag. Nothing is charged online.',
    ar: 'أضف القطع التي تريدها إلى حقيبتك. لا يتم تحصيل أي مبلغ عبر الموقع.',
  },
  'home.order.step2.title': { en: 'Send us your details', ar: 'أرسل لنا بياناتك' },
  'home.order.step2.body': {
    en: 'Your name, WhatsApp number and where the bag is going.',
    ar: 'اسمك ورقم الواتساب وعنوان توصيل الحقيبة.',
  },
  'home.order.step3.title': { en: 'We message you', ar: 'نراسلك' },
  'home.order.step3.body': {
    en: 'We confirm the piece, the total and delivery, then it goes to the bench.',
    ar: 'نؤكد القطعة والمبلغ الإجمالي والتوصيل، ثم تبدأ صناعتها.',
  },
  'home.from': { en: 'Pieces start at', ar: 'تبدأ الأسعار من' },
  // about
  'about.title': { en: 'Four people, two tanneries, one bench', ar: 'أربعة أشخاص، مدبغتان، وطاولة واحدة' },
  'about.intro': {
    en: 'NEVERT began in 2016 with a single tote made for a friend who could not find a bag that kept its shape past the first year. We still work the same way: one hide per bag, cut by hand, closed with saddle stitches that will not unravel even if a thread breaks.',
    ar: 'بدأت NEVERT عام 2016 بحقيبة واحدة صُنعت لصديقة لم تجد حقيبة تحافظ على شكلها بعد العام الأول. وما زلنا نعمل بالطريقة نفسها: جلد واحد لكل حقيبة، يُقص يدوياً، ويُغلق بغرز سرج لا تنفرط حتى لو انقطع خيط.',
  },
  'about.no.title': { en: 'What we do not do', ar: 'ما الذي لا نفعله' },
  'about.no.1': { en: 'No bonded or corrected-grain leather, ever.', ar: 'لا جلد مركّب ولا جلد مصحّح الحبيبات، أبداً.' },
  'about.no.2': {
    en: 'No machine stitching where a hand stitch will hold better.',
    ar: 'لا خياطة بالماكينة حيث تمسك الغرزة اليدوية بشكل أفضل.',
  },
  'about.no.3': {
    en: 'No seasonal drops. A piece stays on the bench until it is right.',
    ar: 'لا إصدارات موسمية. تبقى القطعة على الطاولة حتى تصبح مثالية.',
  },
  'about.care.title': { en: 'Caring for the leather', ar: 'العناية بالجلد' },
  'about.care.body': {
    en: 'Keep it out of long direct sun, wipe rain off with a dry cloth and let it dry away from heat. Once a year, a thin coat of neutral cream is enough. The scratches that come with use will even out on their own.',
    ar: 'أبعدها عن الشمس المباشرة لفترات طويلة، وامسح المطر بقطعة قماش جافة واتركها تجف بعيداً عن الحرارة. مرة واحدة في السنة تكفي طبقة رقيقة من كريم محايد. والخدوش الناتجة عن الاستعمال ستتوحد من تلقاء نفسها.',
  },
  'about.cta.title': { en: 'Questions before you order?', ar: 'أسئلة قبل الطلب؟' },
  'about.cta.body': {
    en: 'Send a message and we will answer with a photo of the actual piece on the bench, in the colour you are considering.',
    ar: 'أرسل رسالة وسنرد عليك بصورة القطعة الفعلية على الطاولة، باللون الذي تفكر فيه.',
  },
  'about.cta.btn': { en: 'Contact the workshop', ar: 'تواصل مع المشغل' },
  // contact
  'contact.title': { en: 'Talk to the workshop', ar: 'تحدث مع المشغل' },
  'contact.sub': {
    en: 'Messages go straight to the bench, so a reply may take a few hours during working days. We answer every one.',
    ar: 'تصل الرسائل مباشرة إلى طاولة العمل، فقد يستغرق الرد بضع ساعات في أيام العمل. نرد على الجميع.',
  },
  'contact.wa.title': { en: 'WhatsApp', ar: 'واتساب' },
  'contact.wa.body': {
    en: 'The fastest way to ask about a colour, a size, or delivery to your city.',
    ar: 'أسرع طريقة للسؤال عن لون أو مقاس أو التوصيل إلى مدينتك.',
  },
  'contact.wa.btn': { en: 'Open WhatsApp', ar: 'افتح واتساب' },
  'contact.wa.pending': {
    en: 'WhatsApp number is being connected. In the meantime, place an order and we will message you.',
    ar: 'جارٍ ربط رقم الواتساب. في هذه الأثناء، أرسل طلبك وسنراسلك نحن.',
  },
  'contact.email.title': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.email.body': { en: 'For repairs, wholesale and press.', ar: 'للإصلاح والجملة والصحافة.' },
  'contact.shop.title': { en: 'Workshop', ar: 'المشغل' },
  'contact.shop.body': {
    en: 'Visits by appointment only. Address shared when we confirm your slot.',
    ar: 'الزيارات بموعد فقط. يُشارك العنوان عند تأكيد موعدك.',
  },
  // collections
  'collections.title': { en: 'Collections', ar: 'المجموعات' },
  'collections.sub': {
    en: 'Three lines, six pieces. Each line uses a different weight of hide, so the feel in the hand changes even when the shape looks familiar.',
    ar: 'ثلاث خطوط وست قطع. كل خط يستخدم وزناً مختلفاً من الجلد، فيتغير الملمس في اليد حتى لو بدا الشكل مألوفاً.',
  },
  'collections.also': { en: 'Also in the workshop', ar: 'أيضاً في المشغل' },
  // product page
  'product.breadcrumb': { en: 'Collections', ar: 'المجموعات' },
  'product.note': {
    en: 'You send your details, we confirm everything over WhatsApp before anything is charged or shipped.',
    ar: 'ترسل بياناتك، ونؤكد كل شيء عبر واتساب قبل تحصيل أي مبلغ أو شحن.',
  },
  'product.materials.title': { en: 'Materials', ar: 'الخامات' },
  'product.materials.body': {
    en: 'Vegetable-tanned full-grain leather, undyed cotton thread, solid brass hardware. Lined in raw silk on the Atelier and Evening lines.',
    ar: 'جلد طبيعي كامل الحبيبات مدبوغ نباتياً، خيط قطن غير مصبوغ، وإكسسوارات نحاس صلب. مبطن بحرير خام في خطي الأتيليه والسهرة.',
  },
  'product.delivery.title': { en: 'Delivery and returns', ar: 'التوصيل والإرجاع' },
  'product.delivery.body': {
    en: 'Made to order, 7–12 days. Delivery is quoted per city when we confirm your order. Returns within 14 days on unused pieces.',
    ar: 'تُصنع عند الطلب خلال 7–12 يوماً. يُحدد سعر التوصيل حسب المدينة عند تأكيد طلبك. الإرجاع خلال 14 يوماً للقطع غير المستعملة.',
  },
  'product.related': { en: 'Others on the bench', ar: 'قطع أخرى على الطاولة' },
  // product gallery
  'gallery.prev': { en: 'Previous image', ar: 'الصورة السابقة' },
  'gallery.next': { en: 'Next image', ar: 'الصورة التالية' },
  'gallery.expand': { en: 'View fullscreen', ar: 'عرض بملء الشاشة' },
  'gallery.close': { en: 'Close fullscreen view', ar: 'إغلاق العرض الكامل' },
  // product actions (React)
  'pa.colour': { en: 'Colour', ar: 'اللون' },
  'pa.size': { en: 'Size', ar: 'المقاس' },
  'pa.dec': { en: 'Decrease quantity', ar: 'إنقاص الكمية' },
  'pa.inc': { en: 'Increase quantity', ar: 'زيادة الكمية' },
  'pa.soldout_combo': { en: 'Sold out in this combination', ar: 'نفدت هذه التركيبة' },
  'pa.instock': { en: 'In stock, ships in 3–5 days', ar: 'متوفرة، تُشحن خلال 3–5 أيام' },
  'pa.add': { en: 'Add to bag', ar: 'أضف إلى الحقيبة' },
  'pa.added': { en: 'Added to your bag', ar: 'أُضيفت إلى حقيبتك' },
  'pa.soldout': { en: 'Sold out', ar: 'نفدت' },
  // cart page (React)
  'cart.title': { en: 'Your bag', ar: 'حقيبتك' },
  'cart.sub': {
    en: 'Nothing is paid on this site. Send your order and we will confirm the total and delivery with you on WhatsApp.',
    ar: 'لا يتم الدفع على هذا الموقع. أرسل طلبك وسنؤكد معك المبلغ الإجمالي والتوصيل عبر واتساب.',
  },
  'cart.empty.title': { en: 'Your bag is empty', ar: 'حقيبتك فارغة' },
  'cart.empty.body': {
    en: 'Six pieces are on the bench right now. Start with the collections.',
    ar: 'توجد ست قطع على الطاولة الآن. ابدأ من المجموعات.',
  },
  'cart.empty.cta': { en: 'See the collections', ar: 'شاهد المجموعات' },
  'cart.sent.title': { en: 'Your order is with us', ar: 'طلبك وصلنا' },
  'cart.sent.keep': { en: 'Keep looking at the collections', ar: 'تابع تصفح المجموعات' },
  'cart.wa.open': { en: 'Open WhatsApp now', ar: 'افتح واتساب الآن' },
  'cart.subtotal': { en: 'Subtotal', ar: 'المجموع الفرعي' },
  'cart.delivery_note': {
    en: 'Delivery is calculated with you on WhatsApp, based on your city.',
    ar: 'يُحسب التوصيل معك عبر واتساب حسب مدينتك.',
  },
  'cart.name': { en: 'Full name', ar: 'الاسم بالكامل' },
  'cart.phone': { en: 'WhatsApp number', ar: 'رقم الواتساب' },
  'cart.city': { en: 'City and address', ar: 'المدينة والعنوان' },
  'cart.notes': { en: 'Anything we should know', ar: 'أي شيء يجب أن نعرفه' },
  'cart.notes_ph': {
    en: 'Monogram, preferred delivery time, a gift note',
    ar: 'أحرف الاسم، وقت التوصيل المفضل، رسالة إهداء',
  },
  'cart.remove': { en: 'Remove', ar: 'إزالة' },
  'cart.send': { en: 'Send order', ar: 'إرسال الطلب' },
  'cart.sending': { en: 'Sending your order', ar: 'جارٍ إرسال طلبك' },
  'cart.agree': {
    en: 'By sending, you agree to be contacted on WhatsApp about this order.',
    ar: 'بإرسالك الطلب، أنت توافق على التواصل معك عبر واتساب بخصوصه.',
  },
  'cart.error_suffix': {
    en: 'Your bag is still here — try again, or send us a message on WhatsApp.',
    ar: 'حقيبتك ما زالت هنا — حاول مجدداً، أو راسلنا على واتساب.',
  },
  'cart.err.send': { en: 'We could not send your order.', ar: 'تعذر إرسال طلبك.' },
  'cart.err.generic': { en: 'Something went wrong.', ar: 'حدث خطأ ما.' },
  // 404
  'notfound.title': { en: 'This page is not here', ar: 'هذه الصفحة غير موجودة' },
  'notfound.body': {
    en: 'The link may be old, or the piece it pointed to has left the bench. The collections are always current.',
    ar: 'قد يكون الرابط قديماً، أو القطعة التي يشير إليها لم تعد موجودة. المجموعات محدثة دائماً.',
  },
  'notfound.cta': { en: 'See the collections', ar: 'شاهد المجموعات' },
};

export function t(key: string, lang: Lang, vars?: Record<string, string | number>): string {
  const entry = dict[key];
  if (!entry) {
    if (typeof console !== 'undefined') console.warn(`[i18n] missing key: ${key}`);
    return key;
  }
  let s = entry[lang] ?? entry.en;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  }
  return s;
}

/** "3 pieces" / "3 قطع" with correct Arabic plural. */
export function piecesCount(n: number, lang: Lang): string {
  if (lang === 'ar') {
    if (n === 0) return 'لا قطع';
    if (n === 1) return 'قطعة واحدة';
    if (n === 2) return 'قطعتان';
    if (n <= 10) return `${n} قطع`;
    return `${n} قطعة`;
  }
  return `${n} ${n === 1 ? 'piece' : 'pieces'}`;
}

/** "4 pieces in Atelier" fully localized (name already localized by caller). */
export function piecesIn(name: string, n: number, lang: Lang): string {
  if (lang === 'ar') return `${piecesCount(n, lang)} في ${name}`;
  return `${n} ${n === 1 ? 'piece' : 'pieces'} in ${name}`;
}

/** "Only 2 left in this combination" */
export function onlyLeft(stock: number, lang: Lang): string {
  if (lang === 'ar') {
    if (stock === 1) return 'بقيت قطعة واحدة من هذه التركيبة';
    if (stock === 2) return 'بقيت قطعتان من هذه التركيبة';
    return `بقي ${stock} فقط من هذه التركيبة`;
  }
  return `Only ${stock} left in this combination`;
}

export function getStoredLang(): Lang {
  if (typeof localStorage === 'undefined') return 'en';
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'ar') return 'ar';
    // Fall back to the cookie (set on every toggle so SSR agrees).
    if (typeof document !== 'undefined' && document.cookie.includes(`${COOKIE_KEY}=ar`))
      return 'ar';
  } catch {}
  return 'en';
}

function persist(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  try {
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
}

/** Swap every static [data-i18n] node, its attributes, and dynamic [data-en]/[data-ar]. */
export function applyLang(lang: Lang): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // 1. Static dictionary keys.
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key || !dict[key]) return;
    // {count} interpolation from data-count.
    const countAttr = el.getAttribute('data-count');
    const vars = countAttr !== null ? { count: countAttr } : undefined;
    el.textContent = t(key, lang, vars);
  });

  // 2. Attributes: data-i18n-attr="placeholder:cart.name;aria-label:cart.name"
  // Supports {count} interpolation from data-count, like [data-i18n].
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    const countAttr = el.getAttribute('data-count');
    const vars = countAttr !== null ? { count: countAttr } : undefined;
    for (const part of spec.split(';')) {
      const [attr, key] = part.split(':').map((s) => s.trim());
      if (!attr || !key || !dict[key]) continue;
      el.setAttribute(attr, t(key, lang, vars));
    }
  });

  // 3. Dynamic catalogue strings baked as data-en / data-ar.
  document.querySelectorAll<HTMLElement>('[data-en]').forEach((el) => {
    const en = el.getAttribute('data-en') ?? '';
    const ar = el.getAttribute('data-ar') ?? '';
    const next = lang === 'ar' && ar.trim() !== '' ? ar : en;
    // Alt attributes for images live on the element itself.
    if (el.tagName === 'IMG' && el.hasAttribute('alt')) {
      el.setAttribute('alt', next);
    } else {
      el.textContent = next;
    }
  });

  // 4. Dynamic attributes (alt/title/placeholder) baked as data-en-attr / data-ar-attr.
  document.querySelectorAll<HTMLElement>('[data-en-attr]').forEach((el) => {
    const spec = el.getAttribute('data-en-attr'); // e.g. "alt" or "alt,title"
    if (!spec) return;
    for (const attr of spec.split(',').map((s) => s.trim())) {
      if (!attr) continue;
      const en = el.getAttribute(`data-en-${attr}`) ?? el.getAttribute('data-en') ?? '';
      const ar = el.getAttribute(`data-ar-${attr}`) ?? el.getAttribute('data-ar') ?? '';
      el.setAttribute(attr, lang === 'ar' && ar.trim() !== '' ? ar : en);
    }
  });

  // 5. Localized counts: data-l10n-count="3" data-l10n-kind="pieces|pieces-in" + data-l10n-name
  document.querySelectorAll<HTMLElement>('[data-l10n-count]').forEach((el) => {
    const n = Number(el.getAttribute('data-l10n-count') ?? '0');
    const kind = el.getAttribute('data-l10n-kind') ?? 'pieces';
    if (kind === 'pieces-in') {
      const nameEn = el.getAttribute('data-l10n-name-en') ?? '';
      const nameAr = el.getAttribute('data-l10n-name-ar') ?? '';
      const name = lang === 'ar' && nameAr.trim() !== '' ? nameAr : nameEn;
      el.textContent = piecesIn(name, n, lang);
    } else {
      el.textContent = piecesCount(n, lang);
    }
  });

  // 6. Localized prices: data-l10n-price="890"
  document.querySelectorAll<HTMLElement>('[data-l10n-price]').forEach((el) => {
    const n = Number(el.getAttribute('data-l10n-price') ?? '0');
    try {
      el.textContent = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      el.textContent = `EGP ${n}`;
    }
  });
}

// Persist preference, animate smoothly, then re-render + notify React islands.
export function setLang(lang: Lang): void {
  persist(lang);
  const run = () => {
    applyLang(lang);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent<Lang>('lang:change', { detail: lang }));
    }
  };
  if (typeof document === 'undefined') {
    run();
    return;
  }
  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Use View Transitions when available for a truly smooth swap.
  const vt = (document as unknown as {
    startViewTransition?: (cb: () => void) => void;
  }).startViewTransition;
  if (vt && !reduceMotion) {
    try {
      vt.call(document, run);
      return;
    } catch {}
  }
  document.body.classList.add('lang-fading');
  window.setTimeout(() => {
    run();
    document.body.classList.remove('lang-fading');
    // Keep the class off after transition so :hover states resume cleanly.
  }, 150);
}
