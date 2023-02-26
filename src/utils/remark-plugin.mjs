import getReadingTime from 'reading-time';
import {toString} from 'mdast-util-to-string';
import sanitizeHtml from 'sanitize-html';

export const remarkExtras = function() {
  return function(tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);
    const numWords = 50;
    const sanitized = sanitizeHtml(textOnPage, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const words = sanitized.split(/\s+/);
    const excerpt = words.slice(0, numWords).join(' ');

    file.data.astro.frontmatter.excerpt = `${excerpt}${words.length > numWords ? '…' : ''}`;
    // console.log(textOnPage);
    file.data.astro.frontmatter.readingTime = readingTime;
  };
};
