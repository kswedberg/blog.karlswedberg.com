import {getFeed} from '@/utils/feed.mjs';

export const get = async(ctx) => {
  const feed = await getFeed(ctx);
  const atom = feed.atom1();

  return {body: atom};
};
