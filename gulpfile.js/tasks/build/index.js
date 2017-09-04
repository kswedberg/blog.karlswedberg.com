require('../clean/');

require('require-dir')();
var gulp = require('gulp');

// Build all the things into the dest directory
gulp.task('build', gulp.series(
  'clean',
  'build:js',
  'build:css',
  'build:img',
  'build:misc',
  'build:rev',
  'build:blog',
  'build:sw',
  'lint'
));

gulp.task('build:serve', gulp.series(
  'clean',
  'clean:serviceworker',
  'build:js',
  'build:css',
  'build:img',
  'build:misc',
  'build:rev:restore-manifest',
  'build:blog',
  // 'build:sw',
  'lint'
));
