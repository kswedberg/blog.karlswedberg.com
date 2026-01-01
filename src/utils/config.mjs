import sanitizeHtml from 'sanitize-html';


const getContentStart = (content, words = 50, ellipses = true) => {
  const sanitized = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const parts = sanitized.split(/\s+/);
  const frag = parts.slice(0, words).join(' ');

  if (parts.length <= words) {
    return sanitized;
  }

  return `${frag}${ellipses ? '...' : ''}`;
};

const getDescription = (content, description, words = 50, ellipses) => {
  return description || getContentStart(content, words, ellipses);
};

export const config = {
  siteTitle: 'Good Blog, Karl',
  author: 'Karl Swedberg',
  description: 'Random quasi-technical stuff I want to remember',
  getSlug: (initial) => {
    const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

    return `${slug}`;
  },

  getDescription,
  getContentStart,
  getSearchContent: (rawContent, rawDescription, title) => {
    const description = getDescription(rawContent, rawDescription, 50, false);
    const content = getContentStart(rawContent, 150, false);


    if (!content.startsWith(description)) {
      return `${content} | ${description}`;
    }

    return content;
  },
  getMetaDescription(description) {
    const descParts = description.split(' ');
    let desc = '';

    for (let i = 0; i < descParts.length; i++) {
      const added = `${desc} ${descParts[i]}`;

      if (added.length > 152) {
        desc += '...';
        break;
      }

      desc = added;
    }

    return (desc || this.description).trim();
  },
};
