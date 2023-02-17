export const config = {
  siteTitle: 'Good Blog, Karl',
  description: 'Random quasi-technical stuff I want to remember',
  getSlug: (initial) => {
    const slug = initial.replace(/^\//, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();

    return `${slug}`;
  },
};
