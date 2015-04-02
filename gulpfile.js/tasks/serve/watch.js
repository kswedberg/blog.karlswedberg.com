var path = require('path');
var config = require('config');
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve:watch', /*'Watch for changes to files and build and/or reload',*/ function(cb) {

  // Watching js src because webpack-dev-middleware is smart
  // and delays requests until the compiling has finished:
  // https://github.com/webpack/webpack-dev-middleware
  gulp.watch([
    path.join(config.get('paths.src'), 'assets/js/**/*.js'),
    path.join(config.get('paths.dest'), 'assets/{fonts|img|json}/**/*.*'),
    path.join(config.get('paths.dest'), '**/*.html'),
    path.join(config.get('paths.dest'), '.htaccess'),
  ]).on('change', browserSync.reload);

  gulp.watch([
    'templates/**/*.html',
    path.join(config.get('metalsmith.source'), '**/*.{html,md}'),
    // 'content/**/*.{html,md}',
    path.join(config.get('paths.src'), '.htaccess'),
    // path.join(config.get('paths.dest'), 'assets/json/**/*.json'),
  ], ['build:rev:restore-manifest', 'build:blog']);

  gulp.watch([
    path.join(config.get('paths.src'), 'assets/css/**/*.css'),
  ], ['build:postcss']);

  gulp.watch([
    path.join(config.get('paths.src'), 'assets/img/**/*'),
    path.join('!', config.get('paths.src'), 'assets/img/sprites/**/*')
  ], ['build:img']);

  // gulp.watch([
  //   path.join(config.get('paths.src'), 'assets/img/sprites/*.svg/*.svg')
  // ], ['build:img:svg-sprite']);

  cb();
});
