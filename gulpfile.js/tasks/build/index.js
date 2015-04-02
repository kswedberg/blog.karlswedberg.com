var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', 'Build all the things into the dest directory', function(cb) {
  runSequence(
    'clean',
    'build:webpack',
    'build:postcss',
    'build:img',
    'build:misc',
    'build:rev',
    'build:blog',
    'lint',
    cb
  );
});
