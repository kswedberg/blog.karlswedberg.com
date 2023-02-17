import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';
import {Feed} from 'feed';

const parser = new MarkdownIt({html: true});
const srcSlash = /(src|href)="\//g;
const srcReplace = '$1="https://blog.karlswedberg.com/';

export const getFeed = async(ctx) => {
  const site = ctx.site.href;
  const blogEntries = await getCollection('posts');
  const posts = blogEntries
  .reverse()
  .map((post, i) => {
    const rendered = parser.render(post.body);
    const content = rendered.replace(srcSlash, srcReplace);
    const excerpt = content.split(/\s+/).slice(0, 40).join(' ');

    const description = excerpt.length < content.length ? `${excerpt}...` : excerpt;
    const link = new URL(`/${config.getSlug(post.slug)}/`, site);

    return {
      title: post.data.title,
      id: link.href,
      link: link.href,
      description: sanitizeHtml(description),
      content,
      date: new Date(post.data.date),
    };
  });


  const feed = new Feed({
    title: config.siteTitle,
    description: config.description,
    id: site,
    link: site,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: 'http://example.com/image.png',
    favicon: 'https://karlswedberg.com/favicon.ico',
    copyright: 'https://creativecommons.org/licenses/by-sa/3.0/',
    updated: new Date(2013, 6, 14),
    generator: 'Feed for node.js',
    feedLinks: {
      json: `${site}feed.json`,
      atom: `${site}atom.xml`,
    },
    author: {
      name: 'Karl Swedberg',
      email: 'kswedberg@gmail.com',
      link: 'https://karlswedberg.com/',
    },
  });

  posts.forEach((post) => {
    feed.addItem(post);
  });

  return feed;
};
