import {getFeed} from '@/utils/feed.mjs';

export const GET = async(ctx) => {
  const feed = await getFeed(ctx);
  const atom = feed.atom1();

  return new Response(atom);
};
