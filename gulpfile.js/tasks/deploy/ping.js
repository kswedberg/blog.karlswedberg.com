var path = require('path');

var gulp = require('gulp');
var shell = require('gulp-shell');

var file = path.join(process.cwd(), 'gitignore', 'deploy');
var settings = require(file);

gulp.task('deploy:ping', function() {
  return gulp.src('package.json', {read: false})
  .pipe(shell([
    'wget <%= ping %>'
  ], {
    templateData: settings
  }));
});
