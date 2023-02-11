import getReadingTime from 'reading-time';
import {toString} from 'mdast-util-to-string';

export const remarkReadingTime = function() {
  return function(tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    file.data.astro.frontmatter.test = 'test';
    file.data.astro.frontmatter.readingTime = readingTime;

  };
};
