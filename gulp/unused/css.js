let path        = require('path');
let config      = require('config');
let gulp        = require('gulp');
let postcss     = require('gulp-postcss');

gulp.task('lint:css', () => {
  let cssDest = path.join(config.get('paths.dest'), 'assets/css');

  return gulp.src(path.join(config.get('paths.src'), 'assets/css/components/**/*.css'))
  .pipe(postcss([
    require('postcss-bem-linter')('suit'),
  ]))
  .pipe(gulp.dest(cssDest));
});
