// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://adriflex.github.io',
  // Si le repo s'appelle "portfolio" et non "adriflex.github.io", décommenter :
  // base: '/portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});