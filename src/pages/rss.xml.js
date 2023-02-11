import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({html: true});

import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';


export const get = async() => {
  const blogEntries = await getCollection('posts');
  const posts = blogEntries
  .reverse()
  .map((post) => {
    const content = parser.render(post.body);

    return {
      link: config.getSlug(post.slug),
      title: post.data.title,
      content: `<![CDATA[${content}]]>`,
      pubDate: post.data.date,
    };
  });

  return rss({
    title: config.siteTitle,
    description: config.description,
    site: import.meta.env.SITE,
    items: posts,
    xmlns: {
      creativeCommons: 'http://backend.userland.com/creativeCommonsRssModule',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    customData: `<language>en-us</language>
    <creativeCommons:license>https://creativecommons.org/licenses/by-sa/3.0/</creativeCommons:license>`,
  });
};
