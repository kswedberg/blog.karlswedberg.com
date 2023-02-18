import {config} from '@/utils/config.mjs';
import sm from '@/assets/img/good-dog-65x65.png';
import md from '@/assets/img/good-dog-192x192.png';
import lg from '@/assets/img/good-dog-512x512.png';
import maskable from '@/assets/img/good-dog-maskable.png';

export const get = (ctx) => {
  const manifest = {
    name: config.siteTitle,
    short_name: 'karl\'s blog',
    description: config.description,
    start_url: '.',
    theme_color: '#075985',
    background_color: '#ffffff',
    // display: 'standalone',
    display: 'browser',
    icons: [
      {
        src: sm.src,
        sizes: '65x65',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: md.src,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: lg.src,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: maskable.src,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  return {body: JSON.stringify(manifest)};
};
