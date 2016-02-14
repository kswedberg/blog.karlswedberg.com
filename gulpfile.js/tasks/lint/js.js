var gulp = require('gulp');
var path = require('path');
var config = require(path.join(process.cwd(), 'gulpfile.js/config'));
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var merge = require('merge-stream');
var fs = require('fs');

gulp.task('lint:js', function() {

  var jshintConfig = JSON.parse(fs.readFileSync(path.join(config.paths.root, '.jshintrc')));

  // Setting unused here because it's annoying to have on by default
  jshintConfig.unused = true;
  var jshintNodeConfig = jshintConfig;
  jshintNodeConfig.node = true;

  var jscsConfig = JSON.parse(fs.readFileSync(path.join(config.paths.root, '.jscsrc')));
  var jscsNodeConfig = jscsConfig;
  jscsNodeConfig.disallowTrailingComma = null;

  var base = gulp.src([
    path.join(config.paths.src, '**/*.js'),
    path.join('!', config.paths.src, '**/lib/*.js'),
    path.join(config.paths.root, '*.js'),
  ])
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs(jscsConfig));

  var node = gulp.src([
    path.join(config.paths.root, 'gulpfile.js/**/*.js'),
    path.join(config.paths.root, 'config/**/*.js'),
  ])
    .pipe(jshint(jshintNodeConfig))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs(jscsNodeConfig));

  return merge(base, node);
});
