require('../build');
require('require-dir')();
var path              = require('path');
var config            = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp              = require('gulp');
var browserSync       = require('browser-sync').get('serve');
var webpackMiddleware = require('webpack-dev-middleware');
var webpack           = require('webpack');

gulp.task('serve', function serve() {

  config.browserSync.middleware = webpackMiddleware(webpack(config.webpack), {
    stats: {colors: true},
    publicPath: config.webpack.middlewarePublicPath,
  });

  browserSync.init(config.browserSync, gulp.series(
    'build:serve',
    'serve:watch'
  ));
});
