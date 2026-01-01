// 1. Import utilities from `astro:content`
import {z, defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
// 2. Define the collection(s)
const postCollection = defineCollection({
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
  }),
  // Things break when I use loader (I guess because I have [slug].astro in the pages root?)
  // loader: glob({
  //   pattern: 'src/content/posts/*.md',
  // }),
});

// 3. Export a single `collections` object to register the collection(s)
//    This key should match the collection directory name in "src/content"
export const collections = {
  posts: postCollection,
};
