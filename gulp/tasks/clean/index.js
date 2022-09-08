let path   = require('path');
let config = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp = require('gulp');
let del    = require('del');

gulp.task('clean', () => {
  return del([path.join(config.paths.dest, '**/*')]);
});

gulp.task('clean:blog', () => {
  return del([
    path.join(config.paths.dest, '**/*'),
    `!${path.join(config.paths.dest, 'assets/**')}`,
  ]);
});

gulp.task('clean:assets', () => {
  return del([
    path.join(config.paths.destAssets, '**/*'),
  ]);
});

gulp.task('clean:css', () => {
  return del([
    path.join(config.paths.destAssets, 'css', '**/*'),
  ]);
});

gulp.task('clean:js', () => {
  return del([
    path.join(config.paths.destAssets, 'js', '**/*'),
  ]);
});
gulp.task('clean:predeploy', () => {
  return del([path.join(config.paths.dest, '_pages')]);
});

gulp.task('clean:serviceworker', () => {
  return del([
    path.join(config.paths.dest, 'sw.js'),
  ]);
});
