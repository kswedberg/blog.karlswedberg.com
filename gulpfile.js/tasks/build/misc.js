var path    = require('path');
var config  = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp = require('gulp');
var changed = require('gulp-changed');
var merge = require('merge-stream');

var src     = [
  path.join(config.paths.src, '.htaccess'),
  path.join(config.paths.src, '*.{html,ico}'),
];
var dest = config.paths.dest;

var assetsDest    = config.paths.destAssets;
var assetsSrc = [
  path.join(config.paths.srcAssets, '**/*'),
  '!' + path.join(config.paths.srcAssets, '{css,img,js}/**/*')
];

// 'Copy files that are not processed some other way into dest'
gulp.task('build:misc', function() {
  var root = gulp.src(assetsSrc)
  .pipe(changed(assetsDest))
  .pipe(gulp.dest(assetsDest));

  var assets = gulp.src(src)
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));

  return merge(root, assets);
});
