var gulp = require('gulp');

gulp.task('deploy', [
  'deploy:sync',
  'deploy:ping'
]);
