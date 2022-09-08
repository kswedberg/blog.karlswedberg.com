
let Promises = require('bluebird');
let path = require('path');
let fs = Promises.promisifyAll(require('fs'));
let marked = require('marked');
let gulp   = require('gulp');
let frontMatter = require('front-matter');
let postPath = path.join(process.cwd(), 'content', '_posts');

gulp.task('build:search', () => {
  let files = [];

  return fs.readdirAsync(postPath)
  .each((file) => {
    return fs.readFileAsync(path.join(postPath, file), 'utf8')
    .then((md) => {
      return frontMatter(md);
    })
    .then((content) => {
      let attrs = content.attributes;

      attrs.timestamp = new Date(attrs.date).getTime();
      attrs.topics = (attrs.categories || '').trim().split(/\s+/);
      console.log(attrs);
      attrs.body = content.body;

      return attrs;
    })
    .then((attrs) => {
      let options = {
        gfm: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: true,
      };

      let body = marked(attrs.body, options);

      attrs.body = body;
      files.push(attrs);

      return files;
    });
  })
  .then(() => {
    let data = JSON.stringify(files, null, 2);

    return fs.writeFileAsync(path.join(process.cwd(), 'public', 'search.json'), data)
    .then(() => {
      console.log('all done!');
    });
  })
  .catch((err) => {
    console.log(err);
  });
});
