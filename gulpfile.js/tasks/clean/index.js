var path   = require('path');
var config = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp = require('gulp');
var del    = require('del');

gulp.task('clean', function() {
  return del([path.join(config.paths.dest, '**/*')]);
});

gulp.task('clean:blog', function() {
  return del([
    path.join(config.paths.dest, '**/*'),
    '!' + path.join(config.paths.dest, 'assets/**'),
  ]);
});

gulp.task('clean:assets', function() {
  return del([
    path.join(config.paths.destAssets, '**/*')
  ]);
});

gulp.task('clean:css', function() {
  return del([
    path.join(config.paths.destAssets, 'css', '**/*')
  ]);
});

gulp.task('clean:js', function() {
  return del([
    path.join(config.paths.destAssets, 'js', '**/*')
  ]);
});
