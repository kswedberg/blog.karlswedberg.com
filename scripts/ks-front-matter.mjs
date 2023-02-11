export const ksFrontMatter = () => {
  return function(tree, file) {
    file.data.astro.frontmatter.layout = file.data.astro.frontmatter.layout || '@/layouts/BlogPostLayout.astro';
  };
};
