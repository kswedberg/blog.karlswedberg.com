import path from 'path';
import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import {remarkReadingTime} from './src/utils/remark-reading-time.mjs';
import {getDirname} from './src/utils/esm.mjs';
import compress from 'astro-compress';

const rootDir = getDirname(import.meta);
const srcDir = path.resolve(rootDir, './src');

// https://astro.build/config

export default defineConfig({
  site: 'https://blog.karlswedberg.com/',
  output: 'static',
  integrations: [
    tailwind({
      config: {applyBaseStyles: false},
    }),
    mdx(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    compress({
      img: false,
      html: {
        removeAttributeQuotes: false,
      },
    }),
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
