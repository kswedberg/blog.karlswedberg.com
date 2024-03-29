import {getCollection} from 'astro:content';
import {formatDate, getAged} from './date.mjs';

const cleanSlug = (initial) => {
  const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

  return `${slug}`;
};

const getNormalizedPost = async(post) => {
  const {id, slug: rawSlug = '', data} = post;
  const {Content, remarkPluginFrontmatter = {}} = await post.render();
  const {excerpt, readingTime} = remarkPluginFrontmatter;

  const {
    tags,
    date: rawDate,
    ...rest
  } = data;
  const slug = cleanSlug(rawSlug);
  const date = new Date(rawDate);

  return {
    id,
    slug,
    rawDate,
    timestamp: date.getTime(),
    date: formatDate(date),
    publishDate: date.toString(),
    aged: getAged(date),
    tags,
    permalink: `/${slug}/`,
    excerpt,
    readingTime,
    ...rest,
    Content: Content,
  };
};
const load = async function() {
  const posts = await getCollection('posts');
  // eslint-disable-next-line no-return-await
  const normalizedPosts = posts.map(async(post) => await getNormalizedPost(post));

  const sorted = (await Promise.all(normalizedPosts))
  .sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf())
  .filter((post) => !post.draft);

  const results = sorted.map((post, i, posts) => {
    post.prev = i < posts.length ? posts[i + 1] : {};
    post.next = i ? posts[i - 1] : {};

    return post;
  });

  return results;
};

let posts = [];

/** */
export const fetchPosts = async() => {
  if (!posts.length) {
    // eslint-disable-next-line require-atomic-updates
    posts = await load();
  }

  return posts;
};

export const fetchPostsByTag = async(tag) => {
  const posts = await fetchPosts();

  return posts
  .filter(({tags = []}) => {
    return tags.includes(tag);
  });
};

export const getTags = async() => {
  const posts = await fetchPosts();

  const unique = [
    ...new Set(posts.map((post) => post.tags).flat()),
  ].sort((a, b) => a.localeCompare(b, 'en'));

  return unique;
};
