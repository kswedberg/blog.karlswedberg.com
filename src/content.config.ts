import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = {posts};
