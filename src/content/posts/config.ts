// 1. Import utilities from `astro:content`
import {z, defineCollection} from 'astro:content';

// 2. Define the collection(s)
const postCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register the collection(s)
//    This key should match the collection directory name in "src/content"
export const collections = {
  posts: postCollection,
};
