var config = require('config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = config.get('webpack');
var yargs = require('yargs');

// Have to use `config.util.cloneDeep` because the properties aren't writable
var bsConfig = config.util.cloneDeep(config.get('browserSync'), 2);

webpackConfig.devtool = 'eval';
webpackConfig.debug = true;

gulp.task('serve:browser-sync', 'Run browser-sync', function(cb) {

  // Allow opening of browser window with --open or -o
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
