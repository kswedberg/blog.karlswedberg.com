let fs = require('fs');
let path = require('path');
let config = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp = require('gulp');
let yargs = require('yargs');
let _ = require('lodash');

let strings = require('./strings.js');

// Add a date-stamped post file
let addPost = function addPost(cb) {
  let tpl = path.join(process.cwd(), config.metalsmith.templateDirectory, 'add-post.tpl');
  let template = fs.readFileSync(tpl);
  let postDir = path.join(config.metalsmith.source, '_posts');

  let argv = yargs
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

  let fileOpts = {
    date: strings.date(),
    title: argv.title,
    categories: strings.cats(argv.cats),
  };
  let compiled = _.template(template);
  let contents = compiled(fileOpts);
  let filePath = path.join(postDir, strings.fileName(argv.title));

  let done = function done(err) {

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
    cats: '-c : Space-separated categories associated with the post',
  },
});

module.exports = addPost;
