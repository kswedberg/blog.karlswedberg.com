import path from 'path';
import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import {remarkReadingTime} from './scripts/remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';
import {getDirname} from './src/utils/esm.mjs';

const rootDir = getDirname(import.meta);
const srcDir = path.resolve(rootDir, './src');

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.karlswedberg.com/',
  output: 'static',
  integrations: [
    tailwind({}),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    resolve: {
      alias: {
        '~': srcDir,
        '@': srcDir,
      },
    },
  },
});
