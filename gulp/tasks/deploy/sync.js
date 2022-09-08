
let gulp = require('gulp');
let shell = require('gulp-shell');

let cmdParts = [
  'rsync',
  '-auz --progress public/',
  process.env.RSYNC_LOCAL,
  process.env.RSYNC_REMOTE,
];

let cmd = cmdParts.join(' ');

gulp.task('deploy:sync', gulp.series(
  (cb) => {
    process.env.BUILD_ENV = 'production';
    cb();
  },
  'build',
  'clean:predeploy',
  'lint:predeploy',
  () => {
    // return gulp;
    return gulp.src('package.json', {read: false})
    .pipe(shell(cmd));
  }
));
