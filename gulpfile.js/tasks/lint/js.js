var path    = require('path');
var config  = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp    = require('gulp');
var eslint      = require('gulp-eslint');
var chalk       = require('chalk');

var displayResults = function displayResults(results) {
  if (!results.warningCount && !results.errorCount) {
    var msg = 'All ' + results.length + ' files Linty Fresh!™';

    return console.log(chalk.green(msg));
  }
};

gulp.task('lint:js', function() {
  return gulp.src([
    path.join(config.paths.srcAssets, 'js/**/*.js{,x}'),
    path.join(config.paths.srcAssets, 'jsx/**/*.js{,x}'),
    '!' + path.join(config.paths.srcAssets, 'js/vendor/**/*.js'),
    '!' + path.join(config.paths.srcAssets, 'js/views/**/*.js'),
  ])
  .pipe(eslint())
  .pipe(eslint.formatEach())
  .pipe(eslint.results(displayResults));
});
