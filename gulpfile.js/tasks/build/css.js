var path        = require('path');
var config      = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp        = require('gulp');
var postcss     = require('gulp-postcss');
var browserSync = require('browser-sync').get('serve');
var gulpif      = require('gulp-if');
var src         = path.join(config.paths.srcAssets, 'css', '*.css');

var dest        = path.join(config.paths.destAssets, 'css');
var sourcemaps  = require('gulp-sourcemaps');
var plugins     = [...config.postcss.plugins];
var isDev       = process.env.BUILD_ENV === 'development';

if (!isDev) {
  plugins.push(...config.postcss.prodPlugins);
}

plugins.push(...config.postcss.lintPlugins);

gulp.task('build:css', function() {
  return gulp.src(src)
  .pipe(gulpif(isDev, sourcemaps.init()))
  .pipe(postcss(plugins))
  .pipe(gulpif(isDev, sourcemaps.write('.')))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream({match: '**/*.css'}));
});
