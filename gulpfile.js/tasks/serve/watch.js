var path        = require('path');
var config      = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve:watch', function serveWatch() {

  var reloadBrowser = function reloadBrowser(done) {
    browserSync.reload();
    done();
  };

  // Watching js src because webpack-dev-middleware is smart
  // and delays requests until the compiling has finished:
  // https://github.com/webpack/webpack-dev-middleware
  gulp.watch([
    path.join(config.paths.srcAssets, '/js/**/*.js'),
    path.join(config.paths.destAssets, '{fonts|img|json}/**/*.*'),
    path.join(config.paths.dest, '**/*.html'),
    path.join(config.paths.dest, '.htaccess'),
  ], reloadBrowser);

  gulp.watch([
    'templates/**/*.html',
    path.join(config.metalsmith.source, '**/*.{html,md}'),
    path.join(config.paths.src, '.htaccess'),
    // path.join(config.paths.destAssets, 'json/**/*.json'),
  ], gulp.series(
    'build:rev:restore-manifest',
    'build:blog'
  ));

  gulp.watch([
    path.join(config.paths.srcAssets, '/css/**/*.css'),
  ], gulp.series('build:css'));

  gulp.watch([
    path.join(config.paths.srcAssets, '/img/**/*'),
    path.join('!' + config.paths.srcAssets, '/img/sprites/**/*')
  ], gulp.series('build:img'));

  // gulp.watch([
  //   path.join(config.paths.srcAssets, '/img/sprites/*.svg/*.svg')
  // ], ['build:img:svg-sprite']);

});
