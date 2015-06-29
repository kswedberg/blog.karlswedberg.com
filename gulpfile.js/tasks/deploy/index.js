var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy', function(cb) {
  runSequence(
    'deploy:sync',
    'deploy:build',
    cb
  );
});
