var gulp = require('gulp');

gulp.task('deploy', [
  'build',
  'lint:predeploy'
  // 'serve:browser-sync',
], function(cb) {
  // monitorCtrlC(done);
  cb();
});
