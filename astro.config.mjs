import path from 'path';
import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';

import {remarkExtras} from './src/utils/remark-plugin.mjs';
import {getDirname} from './src/utils/esm.mjs';
import compress from 'astro-compress';

const rootDir = getDirname(import.meta);
const srcDir = path.resolve(rootDir, './src');

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.karlswedberg.com/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: '_assets',
  },
  integrations: [
    mdx(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
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
    vue(),
  ],
  markdown: {
    remarkPlugins: [remarkExtras],
  },
  vite: {
    // plugins: [
    //   viteVue()
    // ],
    resolve: {
      alias: {
        '~': srcDir,
        '@': srcDir,
      },
    },
  },
});
