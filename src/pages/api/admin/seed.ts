import type { APIRoute } from 'astro';
import { importStarterCatalogue } from '../../../lib/admin-data';

export const prerender = false;

export const POST: APIRoute = async ({ redirect }) => {
  const result = await importStarterCatalogue();
  return redirect(result.ok ? '/admin/products?saved=1' : '/admin/products?error=save');
};
