import {config} from '@/utils/config.mjs';
import md from '@/assets/img/icon-192.png';
import lg from '@/assets/img/icon-512.png';
import maskable from '@/assets/img/good-dog-maskable.png';

export const GET = (ctx) => {
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

  return new Response(JSON.stringify(manifest));
};
