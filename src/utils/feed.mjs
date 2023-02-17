import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';
import {Feed} from 'feed';

// https://github.com/jpmonette/feed

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
    language: 'en-US',
    image: 'https://blog.karlswedberg.com/img/good-dog-512x512.png',
    favicon: 'https://blog.karlswedberg.com/img/good-dog-65x65.png',
    copyright: '© Karl Swedberg. License: Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) (https://creativecommons.org/licenses/by-sa/3.0/)',
    generator: 'Feed for node.js',
    feedLinks: {
      json: `${site}feed.json`,
      rss: `${site}rss2.xml`,
      atom: `${site}atom.xml`,
    },
    author: {
      name: 'Karl Swedberg',
      link: 'https://karlswedberg.com/',
    },
  });

  posts.forEach((post) => {
    feed.addItem(post);
  });

  return feed;
};
