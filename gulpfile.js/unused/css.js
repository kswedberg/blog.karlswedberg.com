var path        = require('path');
var config      = require('config');
var gulp        = require('gulp');
var postcss     = require('gulp-postcss');

gulp.task('lint:css', function() {
  var cssDest = path.join(config.get('paths.dest'), 'assets/css');

  return gulp.src(path.join(config.get('paths.src'), 'assets/css/components/**/*.css'))
    .pipe(postcss([
      require('postcss-bem-linter')('suit')
    ]))
    .pipe(gulp.dest(cssDest));
});
