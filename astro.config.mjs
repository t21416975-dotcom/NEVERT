// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  adapter: vercel(),
  output: 'server',
  // Smaller HTML over the wire; no visual effect.
  compressHTML: true,
  security: {
    // Astro's built-in origin check compares the full origin (including
    // protocol) against the URL as the function sees it. Behind Vercel's
    // edge proxy the internal protocol is http while browsers send
    // https, so every same-site admin POST was rejected with 403.
    // Disabled here; src/middleware.ts enforces its own proxy-aware,
    // host-based CSRF check for /api/admin/* instead.
    checkOrigin: false,
  },
});
