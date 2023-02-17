import {getFeed} from '@/utils/feed.mjs';

export const get = async(ctx) => {
  const feed = await getFeed(ctx);
  const rss = feed.rss2();

  return {body: rss};
};
