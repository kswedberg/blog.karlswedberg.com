import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';


// https://github.com/jpmonette/feed

const parser = new MarkdownIt({html: true});

export const GET = async(ctx) => {
  const site = ctx.site.href;
  const blogEntries = await getCollection('posts');

  const posts = blogEntries
  .map((post, i) => {
    const rendered = parser.render(post.body);
    let excerpt = config.getSearchContent(rendered, post.data.description, post.data.title);

    if (post.data.tags.length) {
      // excerpt = `${excerpt} | ${post.data.tags.join(', ')}`;
    }
    const link = new URL(`/${config.getSlug(post.slug)}/`, site);

    return {
      title: post.data.title,
      url: link.href,
      excerpt,
      date: new Date(post.data.date),
    };
  })
  .sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return new Response(JSON.stringify(posts));
};
