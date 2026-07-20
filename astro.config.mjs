// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import { isNoindexToolPath } from './src/data/sitemap-exclusions.mjs';

const spanishRedirects = JSON.parse(fs.readFileSync('./src/data/spanish-redirects.json', 'utf8'));

export default defineConfig({
  site: 'https://taptogen.com',
  trailingSlash: 'always',
  compressHTML: true,
  redirects: spanishRedirects,
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
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        'theme': '/theme',
        '@': '/src',
      },
    },
  },
});
