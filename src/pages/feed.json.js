import {getFeed} from '@/utils/feed.mjs';

export const GET = async(ctx) => {
  const feed = await getFeed(ctx);
  const json = feed.json1();

  return new Response(json);
};
