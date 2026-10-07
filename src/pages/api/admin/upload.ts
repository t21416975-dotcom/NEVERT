import type { APIRoute } from 'astro';
import { adminClient } from '../../../lib/db';

export const prerender = false;

const BUCKET = 'product-images';
const MAX_BYTES = 5 * 1024 * 1024; // 5MB per image
const MAX_FILES = 10;

const serviceReady = () =>
  Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL &&
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

/** POST multipart files[] → { urls: [publicUrl, …] }. Admin-only (middleware). */
export const POST: APIRoute = async ({ request }) => {
  if (!serviceReady()) {
    return json(
      { error: 'الرفع يحتاج SUPABASE_SERVICE_ROLE_KEY في متغيرات البيئة.' },
      503
    );
  }
  const db = adminClient();
  if (!db) {
    return json({ error: 'لا يوجد اتصال بقاعدة البيانات.' }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'تعذر قراءة الملفات.' }, 400);
  }

  const files = form
    .getAll('files')
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);

  if (files.length === 0) {
    return json({ error: 'اختر صورة واحدة على الأقل.' }, 400);
  }

  const urls: string[] = [];
  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      return json({ error: `الملف ${file.name} ليس صورة.` }, 400);
    }
    if (file.size > MAX_BYTES) {
      return json({ error: `الصورة ${file.name} أكبر من 5MB.` }, 400);
    }
    const ext =
      file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ||
      'jpg';
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

    const { error } = await db.storage
      .from(BUCKET)
      .upload(key, file, { contentType: file.type, upsert: false });
    if (error) {
      const missingBucket = /bucket|not found/i.test(error.message);
      return json(
        {
          error: missingBucket
            ? 'مخزن الصور غير موجود. نفّذ ملف supabase/storage.sql أولاً.'
            : `تعذر رفع ${file.name}. حاول مجدداً.`,
        },
        500
      );
    }
    const { data } = db.storage.from(BUCKET).getPublicUrl(key);
    urls.push(data.publicUrl);
  }

  return json({ ok: true, urls });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
