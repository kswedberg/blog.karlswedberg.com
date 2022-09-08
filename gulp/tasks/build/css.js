let path        = require('path');
let config      = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp        = require('gulp');
let postcss     = require('gulp-postcss');
let browserSync = require('browser-sync').get('serve');
let gulpif      = require('gulp-if');
let src         = path.join(config.paths.srcAssets, 'css', '*.css');

let dest        = path.join(config.paths.destAssets, 'css');
let sourcemaps  = require('gulp-sourcemaps');
let plugins     = [...config.postcss.plugins];
let isDev       = process.env.BUILD_ENV === 'development';

if (!isDev) {
  plugins.push(...config.postcss.prodPlugins);
}

plugins.push(...config.postcss.lintPlugins);

gulp.task('build:css', () => {
  return gulp.src(src)
  .pipe(gulpif(isDev, sourcemaps.init()))
  .pipe(postcss(plugins))
  .pipe(gulpif(isDev, sourcemaps.write('.')))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream({match: '**/*.css'}));
});
