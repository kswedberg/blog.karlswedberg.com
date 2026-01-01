import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';
import {Feed} from 'feed';
import sm from '@/assets/img/icon.svg';
import lg from '@/assets/img/icon-512.png';

// https://github.com/jpmonette/feed

const parser = new MarkdownIt({html: true});

export const GET = async(ctx) => {
  const site = ctx.site.href;
  const blogEntries = await getCollection('posts');

  const posts = blogEntries
  .map((post, i) => {
    const rendered = parser.render(post.body);
    const content = sanitizeHtml(rendered, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const excerpt = content.split(/\s+/).slice(0, 40).join(' ');

    const description = excerpt.length < content.length ? `${excerpt}...` : excerpt;
    const link = new URL(`/${config.getSlug(post.slug)}/`, site);

    return {
      title: post.data.title,
      url: link.href,
      excerpt: sanitizeHtml(description),
      date: new Date(post.data.date),
    };
  })
  .sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return new Response(JSON.stringify(posts));
};
