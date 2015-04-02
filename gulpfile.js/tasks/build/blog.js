var config = require('config');
var gulp = require('gulp');
var helpDesc = 'Build the metalsmith blog pages/posts, etc';
var path = require('path');

gulp.task('build:blog', helpDesc, function(cb) {

  var browserSync = require('browser-sync');
  var MetalSmith = require('metalsmith');
  var metalsmith = new MetalSmith(process.cwd());
  var branch = require('metalsmith-branch');
  var opts = config.util.cloneDeep(config.get('metalsmith'));
  var plugins = opts.plugins;
  var revFile = require(path.join(config.get('paths.dest'), 'assets/json/rev-manifest.json'));

  if (browserSync.active) {
    opts.metadata.resources = revFile;
    console.log('browsersyunc dot active!');
  }
  console.log(revFile);
  console.log(opts.metadata.resources);

  metalsmith
  .source(opts.source)
  .destination(opts.destination)

  .metadata(opts.metadata)

  // Need to call .clean(false) so assets won't be overwritten
  .clean(false);

  plugins.forEach(function(plugin) {
    var mod = require(plugin.module);

    if (plugin.branch) {
      metalsmith.use(branch(plugin.branch).use(mod(plugin.options)));
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
