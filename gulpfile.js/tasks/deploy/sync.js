
var gulp = require('gulp');
var shell = require('gulp-shell');

var cmdParts = [
  'rsync',
  '-auz --progress public/',
  process.env.RSYNC_LOCAL,
  process.env.RSYNC_REMOTE
];

var cmd = cmdParts.join(' ');

gulp.task('deploy:sync', gulp.series(
  function(cb) {
    process.env.BUILD_ENV = 'production';
    cb();
  },
  'build',
  'lint:predeploy',
  function() {
    return gulp.src('package.json', {read: false})
    .pipe(shell(cmd));
  }
));
