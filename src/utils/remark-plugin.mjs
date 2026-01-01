import getReadingTime from 'reading-time';
import {toString} from 'mdast-util-to-string';

export const remarkExtras = function() {
  return function(tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    // console.log(textOnPage);
    file.data.astro.frontmatter.readingTime = readingTime;
  };
};
