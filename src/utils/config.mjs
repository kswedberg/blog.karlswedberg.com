export const config = {
  siteTitle: 'Good Blog, Karl',
  author: 'Karl Swedberg',
  description: 'Random quasi-technical stuff I want to remember',
  getSlug: (initial) => {
    const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

    return `${slug}`;
  },
  getDescription(description) {
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
