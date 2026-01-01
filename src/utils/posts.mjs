import {getCollection} from 'astro:content';
import {formatDate, getAged} from './date.mjs';
import {config} from './config.mjs';

const cleanSlug = (initial) => {
  const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

  return `${slug}`;
};

/**
 * Normalize a post object from the content/posts directory.
 * @param {Object} post - The post object.
 * @returns {Promise<Object>} A normalized post object.
 */
const getNormalizedPost = async(post) => {
  const {id, slug: rawSlug = '', data} = post;
  const {Content, remarkPluginFrontmatter = {}} = await post.render();
  const {readingTime} = remarkPluginFrontmatter;

  const {
    tags,
    description,
    date: rawDate,
    ...rest
  } = data;
  const slug = cleanSlug(rawSlug);
  const date = new Date(rawDate);

  return {
    id,
    slug,
    description: config.getDescription(post.rendered.html, description),
    rawDate,
    timestamp: date.getTime(),
    date: formatDate(date),
    publishDate: date.toString(),
    aged: getAged(date),
    tags,
    permalink: `/${slug}/`,
    readingTime,
    ...rest,
    Content: Content,
  };
};

const load = async function() {
  const posts = await getCollection('posts');
  const normalizedPosts = posts.map((post) => getNormalizedPost(post));

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

/**
 * Fetch all posts in the content/posts directory and return them as an array of objects.
 * @returns {Promise<Array>} An array of post objects.
 */
export const fetchPosts = async() => {
  if (!posts.length) {
    // eslint-disable-next-line require-atomic-updates
    posts = await load();
  }

  return posts;
};

/**
 * Fetch all posts in the content/posts directory and return them as an array of objects.
 * @param {string} tag - The tag to filter posts by.
 * @returns {Promise<Array>} An array of post objects.
 */
export const fetchPostsByTag = async(tag) => {
  const posts = await fetchPosts();

  return posts
  .filter(({tags = []}) => {
    return tags.includes(tag);
  });
};


/**
 * Fetch all tags from posts in the content/posts directory and return them as an array of unique strings.
 * @returns {Promise<Array>} An array of unique tag strings.
 */
export const getTags = async() => {
  const posts = await fetchPosts();

  const unique = [
    ...new Set(posts.map((post) => post.tags).flat()),
  ].sort((a, b) => a.localeCompare(b, 'en'));

  return unique;
};
