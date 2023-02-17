import {getFeed} from '@/utils/feed.mjs';

export const get = async(ctx) => {
  const feed = await getFeed(ctx);
  const json = feed.json1();

  return {
    body: json,
  };
};
