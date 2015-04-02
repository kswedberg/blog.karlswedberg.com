var gulp = require('gulp');
var monitorCtrlC = require('monitorctrlc');
var browserSync = require('browser-sync');
var done = function(cb) {
  console.log('It has been a pleasure serving you.');
  browserSync.exit();
  process.exit(0);
  cb();
};

gulp.task('serve', 'Run watch and browser-sync tasks', [
  'serve:watch',
  'serve:browser-sync',
], function(cb) {
  monitorCtrlC(done);
  cb();
}, {
  options: {
    open: '-o : Open the webpage in your default browser'
  }
});
