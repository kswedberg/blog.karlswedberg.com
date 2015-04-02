var config = require('config');
var path   = require('path');
var gulp = require('gulp');
var del    = require('del');

gulp.task('clean', function(cb) {
  del([path.join(config.get('paths.dest'), '**/*')], cb);
});

gulp.task('clean:blog', function(cb) {
  del([
    path.join(config.get('paths.dest'), '**/*'),
    '!' + path.join(config.get('paths.dest'), 'assets/**'),
  ], cb);
});

gulp.task('clean:assets', function(cb) {
  del([
    path.join(config.get('paths.dest'), 'assets', '**/*')
  ], cb);
});

gulp.task('clean:css', function(cb) {
  del([
    path.join(config.get('paths.dest'), 'assets', 'css', '**/*')
  ], cb);
});

gulp.task('clean:js', function(cb) {
  del([
    path.join(config.get('paths.dest'), 'assets', 'js', '**/*')
  ], cb);
});
