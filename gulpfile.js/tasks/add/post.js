var fs = require('fs');
var path = require('path');
var config = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp = require('gulp');
var yargs = require('yargs');
var _ = require('lodash');

var strings = require('./strings');

// Add a date-stamped post file
var addPost = function addPost(cb) {
  var tpl = path.join(process.cwd(), config.metalsmith.templateDirectory, 'add-post.tpl');
  var template = fs.readFileSync(tpl);
  var postDir = path.join(config.metalsmith.source, '_posts');

  var argv = yargs
  .demand('t')
  .option('t', {
    alias: 'title',
    demand: true,
    describe: 'The title of the post',
  })
  .option('c', {
    alias: 'cats',
    describe: 'Space-separated categories associated with the post',
  })
  .argv;

  var fileOpts = {
    date: strings.date(),
    title: argv.title,
    categories: strings.cats(argv.cats)
  };
  var compiled = _.template(template);
  var contents = compiled(fileOpts);
  var filePath = path.join(postDir, strings.fileName(argv.title));

  var done = function done(err) {

    if (err) {
      throw err;
    }

    console.log('Created new post:');
    console.log(path.relative(process.cwd(), filePath));

    if (typeof cb === 'function') {
      cb();
    }
  };

  fs.writeFile(filePath, contents, done);

};
gulp.task('add:post', addPost, {
  options: {
    title: '-t : The title of the post',
    cats: '-c : Space-separated categories associated with the post'
  }
});

module.exports = addPost;
