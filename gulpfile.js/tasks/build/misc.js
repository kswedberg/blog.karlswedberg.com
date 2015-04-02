var path    = require('path');
var config  = require('config');
var gulp = require('gulp');
var changed = require('gulp-changed');
var merge = require('merge-stream');

var src     = [
  path.join(config.get('paths.src'), '.htaccess'),
  path.join(config.get('paths.src'), '*.{html,ico}'),
];
var dest = config.get('paths.dest');

var assetsDest    = path.join(config.get('paths.dest'), 'assets');
var assetsSrc = [
  path.join(config.get('paths.src'), 'assets/**/*'),
  '!' + path.join(config.get('paths.src'), 'assets/{css,img,js}/**/*')
];

gulp.task('build:misc', 'Copy files that are not processed some other way into dest', function() {
  var root = gulp.src(assetsSrc)
  .pipe(changed(assetsDest))
  .pipe(gulp.dest(assetsDest));

  var assets = gulp.src(src)
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));

  return merge(root, assets);
});
