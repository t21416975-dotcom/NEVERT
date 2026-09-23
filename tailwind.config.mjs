/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#FAF8F4',
        linen: '#EFE9DF',
        espresso: '#2B2620',
        cognac: '#A67B4F',
        'cognac-dark': '#8F6740',
        sage: '#9CA08C',
        stone: '#8A8378',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
        admin: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        'admin-display': ['Amiri', '"IBM Plex Sans Arabic"', 'serif'],
      },
      letterSpacing: {
        'wide-luxe': '0.08em',
      },
    },
  },
  plugins: [],
};
