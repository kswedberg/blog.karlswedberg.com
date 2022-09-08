require('../lint');
let path        = require('path');
let config      = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp        = require('gulp');
let gulpWebpack = require('webpack-stream');
let webpack     = require('webpack');

/**
 * Webpack config controls:
 * - Entry point/files (dummy.js does not exist)
 * - Nunjuck template precompiling
 */

gulp.task('build:js:create', () => {
  return gulp.src('dummy.js', {allowEmpty: true})
  .pipe(gulpWebpack(config.webpack, webpack))
  .pipe(gulp.dest(config.webpack.output.path));
});

gulp.task('build:js', gulp.series(
  'build:js:create',
  'lint:js'
));
