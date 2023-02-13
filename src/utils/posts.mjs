import {getCollection} from 'astro:content';

const cleanSlug = (initial) => {
  const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

  return `${slug}`;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'America/Detroit',
  // timeZoneName: 'short',
});

const formatDate = (date) => {
  const isDate = date instanceof Date;
  const d = isDate ? date : new Date(date);

  return dateFormatter.format(d);
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
    tags,
    permalink: `/${slug}`,
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

  const results = (await Promise.all(normalizedPosts))
  .sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf())
  .filter((post) => !post.draft);

  return results;
};

let posts = [];

/** */
export const fetchPosts = async() => {
  if (!posts.length) {
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

  return [
    ...new Set(posts.map((post) => post.tags).flat()),
  ];
};
