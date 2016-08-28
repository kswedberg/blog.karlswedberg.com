
var Promises = require('bluebird');
var path = require('path');
var fs = Promises.promisifyAll(require('fs'));
var marked = require('marked');
var gulp   = require('gulp');
var frontMatter = require('front-matter');
var postPath = path.join(process.cwd(), 'content', '_posts');

gulp.task('build:search', function() {
  var files = [];

  return fs.readdirAsync(postPath)
  .each(function(file) {
    return fs.readFileAsync(path.join(postPath, file), 'utf8')
    .then(function(md) {
      return frontMatter(md);
    })
    .then(function(content) {
      var attrs = content.attributes;
      attrs.timestamp = new Date(attrs.date).getTime();
      attrs.topics = (attrs.categories || '').trim().split(/\s+/);
      console.log(attrs);
      attrs.body = content.body;

      return attrs;
    })
    .then(function(attrs) {
      var options = {
        gfm: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: true
      };

      var body = marked(attrs.body, options);
      attrs.body = body;
      files.push(attrs);

      return files;
    });
  })
  .then(function() {
    var data = JSON.stringify(files, null, 2);

    return fs.writeFileAsync(path.join(process.cwd(), 'public', 'search.json'), data)
    .then(function() {
      console.log('all done!');
    });
  })
  .catch(function(err) {
    console.log(err);
  });
});
