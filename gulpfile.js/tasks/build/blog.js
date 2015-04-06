var path = require('path');
var config = require('config');
var gulp = require('gulp');

var helpDesc = 'Build the metalsmith blog pages/posts, etc';

gulp.task('build:blog', helpDesc, function(cb) {

  var MetalSmith = require('metalsmith');
  var metalsmith = new MetalSmith(process.cwd());
  var branch = require('metalsmith-branch');
  var revFile = require(path.join(config.get('paths.dest'), 'assets/json/rev-manifest.json'));

  // Have to use `config.util.cloneDeep` because the config properties aren't writable
  var opts = config.util.cloneDeep(config.get('metalsmith'));
  var plugins = opts.plugins;

  opts.metadata.resources = revFile;

  // Wish I didn't have to do this here.
  if (config.env === 'production') {
    plugins.push({
      module: 'metalsmith-html-minifier',
      options: {
        removeRedundantAttributes: false
      }
    });
  }

  console.log('Building the blog with metalsmith in', config.get('env'), 'mode…');

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
