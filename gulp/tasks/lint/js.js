let path    = require('path');
let config  = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp    = require('gulp');
let eslint      = require('gulp-eslint');
let chalk       = require('chalk');

let displayResults = function displayResults(results) {
  if (!results.warningCount && !results.errorCount) {
    let msg = `All ${results.length} files Linty Fresh!™`;

    return console.log(chalk.green(msg));
  }
};

gulp.task('lint:js', () => {
  return gulp.src([
    path.join(config.paths.srcAssets, 'js/**/*.js{,x}'),
    path.join(config.paths.srcAssets, 'jsx/**/*.js{,x}'),
    `!${path.join(config.paths.srcAssets, 'js/vendor/**/*.js')}`,
    `!${path.join(config.paths.srcAssets, 'js/views/**/*.js')}`,
  ])
  .pipe(eslint())
  .pipe(eslint.formatEach())
  .pipe(eslint.results(displayResults));
});
