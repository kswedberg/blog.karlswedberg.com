import {config} from '@/utils/config.mjs';

export const get = (ctx) => {
  const manifest = {
    name: config.siteTitle,
    short_name: 'karl\'s blog',
    description: config.description,
    start_url: '.',
    theme_color: '#075985',
    background_color: '#ffffff',
    // display: 'standalone',
    icons: [
      {
        src: '/img/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return {body: JSON.stringify(manifest)};
};
