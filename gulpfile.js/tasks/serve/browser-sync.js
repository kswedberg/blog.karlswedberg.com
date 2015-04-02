var config = require('config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var bsConfig = config.util.cloneDeep(config.get('browserSync'), 2);
var webpackConfig = config.get('webpack');
var yargs = require('yargs');

webpackConfig.devtool = 'eval';
webpackConfig.debug = true;

gulp.task('serve:browser-sync', 'Run browser-sync', function(cb) {
  var argv = yargs.option('open', {
    alias: 'o',
    default: bsConfig.open
  }).argv;

  bsConfig.open = argv.open;

  bsConfig.middleware = webpackMiddleware(webpack(webpackConfig), {
    stats: { colors: true },
    publicPath: '/assets/js/',
  });

  // Load BS and trigger initial build
  browserSync(bsConfig);

  // Do an initial build
  browserSync.emitter.on('init', function() {
    gulp.start('build');
  });

  cb();
}, {
  options: {
    open: '-o : Open the webpage in your default browser'
  }
});
