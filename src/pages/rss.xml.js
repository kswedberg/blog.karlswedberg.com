import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import {getCollection} from 'astro:content';
import {config} from '@/utils/config.mjs';

const parser = new MarkdownIt({html: true});
const srcSlash = /(src|href)="\//g;
const srcReplace = '$1="https://blog.karlswedberg.com/';

/**
 * Test the output against the feed validator at
 * https://validator.w3.org/feed/check.cgi
 */

export const get = async() => {
  const blogEntries = await getCollection('posts');
  const posts = blogEntries
  .reverse()
  .map((post, i) => {
    const rendered = parser.render(post.body);
    const content = rendered.replace(srcSlash, srcReplace);
    const excerpt = content.split(/\s+/).slice(0, 50).join(' ');

    const description = excerpt.length < content.length ? `${excerpt}...` : excerpt;

    return {
      link: config.getSlug(post.slug),
      title: post.data.title,
      description: `<![CDATA[${sanitizeHtml(description)}]]>`,
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
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `<language>en-us</language>
    <creativeCommons:license>https://creativecommons.org/licenses/by-sa/3.0/</creativeCommons:license>
    <atom:link href="https://blog.karlswedberg.com/rss.xml" rel="self" type="application/rss+xml" />`,
  });
};
