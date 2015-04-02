var path     = require('path');
var config   = require('config');
var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed');
var dest     = path.join(config.get('paths.dest'), 'assets/img');

var src = [
  path.join(config.get('paths.src'), 'assets/img/**/*'),
  path.join('!', config.get('paths.src'), 'assets/img/sprites/**/*')
];

// gulp.task('build:img', [
//   'build:img:optimize',
//   'build:img:svg-sprite'
// ]);

gulp.task('build:img', 'Optimize images and build into dest directory', function() {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: []
    }))
    .pipe(gulp.dest(dest));
});
