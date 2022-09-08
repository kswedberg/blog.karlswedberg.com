require('../build/index.js');
require('require-dir')();
let path              = require('path');
let config            = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp              = require('gulp');
let browserSync       = require('browser-sync').get('serve');
let webpackMiddleware = require('webpack-dev-middleware');
let webpack           = require('webpack');

gulp.task('serve', () => {

  config.browserSync.middleware = webpackMiddleware(webpack(config.webpack), {
    stats: {colors: true},
    publicPath: config.webpack.middlewarePublicPath,
  });

  browserSync.init(config.browserSync, gulp.series(
    'build:serve',
    'serve:watch'
  ));
});
