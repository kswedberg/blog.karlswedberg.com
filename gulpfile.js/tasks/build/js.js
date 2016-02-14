require('../lint');
var path        = require('path');
var config      = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp        = require('gulp');
var gulpWebpack = require('webpack-stream');
var webpack     = require('webpack');

/**
 * Webpack config controls:
 * - Entry point/files (dummy.js does not exist)
 * - Nunjuck template precompiling
 */

gulp.task('build:js:create', function() {
  return gulp.src('dummy.js', {allowEmpty: true})
  .pipe(gulpWebpack(config.webpack, webpack))
  .pipe(gulp.dest(config.webpack.output.path));
});

gulp.task('build:js', gulp.series(
  'build:js:create',
  'lint:js'
));
