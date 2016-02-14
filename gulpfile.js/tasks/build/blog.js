var path   = require('path');
var config = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp   = require('gulp');

// 'Build the metalsmith blog pages/posts, etc'
gulp.task('build:blog', function(cb) {

  var MetalSmith = require('metalsmith');
  var metalsmith = new MetalSmith(process.cwd());
  var branch = require('metalsmith-branch');
  var revFile = require(path.join(config.paths.dest, 'assets/json/rev-manifest.json'));

  var opts = config.metalsmith;
  var plugins = [].concat(opts.plugins);

  opts.metadata.resources = revFile;

  if (process.env.BUILD_ENV === 'production') {
    plugins = plugins.concat(opts.prodPlugins);
  }

  console.log('Building the blog with metalsmith in', process.env.BUILD_ENV, 'mode…');

  // Run through the metalsmith pipeline...
  metalsmith
  .source(opts.source)
  .destination(opts.destination)

  .metadata(opts.metadata)

  // Need to call .clean(false) so assets won't be overwritten
  .clean(false);

  plugins.forEach(function(plugin) {
    var mod = require(plugin.module);

    if (plugin.branch) {
      metalsmith.use(branch(plugin.branch).use(mod(plugin.options, plugin.extra)));
    } else {
      metalsmith.use(mod(plugin.options));
    }
  });

  metalsmith.build(function(err) {
    var msg = 'Finished building into ' + opts.destination;

    if (err) {
      msg = err;
    }

    console.log(msg);

    cb();
  });
});
