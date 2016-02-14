var gulp = require('gulp');
var shell = require('gulp-shell');
var cmd = 'wget -O - -q -t 1 ' + process.env.PING_URL;

gulp.task('deploy:ping', function() {
  return gulp.src('package.json', {read: false})
  .pipe(shell(cmd));
});
