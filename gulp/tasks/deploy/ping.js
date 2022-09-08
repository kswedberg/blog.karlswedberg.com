let gulp = require('gulp');
let shell = require('gulp-shell');
let cmd = `wget -O - -q -t 1 ${process.env.PING_URL}`;

gulp.task('deploy:ping', () => {
  return gulp.src('package.json', {read: false})
  .pipe(shell(cmd));
});
