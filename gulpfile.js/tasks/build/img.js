var path     = require('path');
var config   = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed');
var dest     = path.join(config.paths.destAssets, 'img');

var src = [
  path.join(config.paths.srcAssets, 'img/**/*'),
  path.join('!' + config.paths.srcAssets, 'img/sprites/**/*')
];

// gulp.task('build:img', [
//   'build:img:optimize',
//   'build:img:svg-sprite'
// ]);

// 'Optimize images and build into dest directory'
gulp.task('build:img', function() {
  return gulp.src(src)
  .pipe(changed(dest))
  .pipe(imagemin({
    progressive: true,
    optimizationLevel: 3,
    svgoPlugins: []
  }))
  .pipe(gulp.dest(dest));
});
