import {getFeed} from '@/utils/feed.mjs';

export const GET = async(ctx) => {
  const feed = await getFeed(ctx);
  const rss = feed.rss2();

  return new Response(rss);
};
