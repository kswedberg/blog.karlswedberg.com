require('../clean/');

require('require-dir')();
var gulp = require('gulp');

// 'Build all the things into the dest directory
gulp.task('build', gulp.series(
  'clean',
  'build:js',
  'build:css',
  'build:img',
  'build:misc',
  'build:rev',
  'build:blog',
  'lint'
));
