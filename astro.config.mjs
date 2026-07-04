// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { isNoindexToolPath } from './src/data/sitemap-exclusions.mjs';

export default defineConfig({
  site: 'https://taptogen.com',
  trailingSlash: 'always',
  compressHTML: true,
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !isNoindexToolPath(new URL(page).pathname),
    }),
    mdx(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
    resolve: {
      alias: {
        'theme': '/theme',
        '@': '/src',
      },
    },
  },
});
