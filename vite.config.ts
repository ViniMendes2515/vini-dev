/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'prism',
        prismOptions: {
          additionalLangs: ['go'],
        },
      },
      prerender: {
        routes: async () => [
          '/',
          '/about',
          '/projects',
          '/books',
          '/contact',
          '/blog',
          '/blog/construindo-mitsu-go-redis',
          '/blog/validacao-zod-nodejs',
        ],
        sitemap: {
          host: 'https://vinimendes.vercel.app',
        },
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
