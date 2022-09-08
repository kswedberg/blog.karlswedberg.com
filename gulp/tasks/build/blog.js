let path   = require('path');
let config = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp   = require('gulp');

// 'Build the metalsmith blog pages/posts, etc'
gulp.task('build:blog', (cb) => {

  let MetalSmith = require('metalsmith');
  let metalsmith = new MetalSmith(process.cwd());
  let branch = require('metalsmith-branch');
  let revFile = require(path.join(config.paths.dest, 'assets/json/rev-manifest.json'));

  let opts = config.metalsmith;
  let plugins = [].concat(opts.plugins);

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

  plugins.forEach((plugin) => {
    let mod = require(plugin.module);

    if (plugin.branch) {
      metalsmith.use(branch(plugin.branch).use(mod(plugin.options, plugin.extra)));
    } else {
      metalsmith.use(mod(plugin.options));
    }
  });

  metalsmith.build((err) => {
    let msg = `Finished building into ${opts.destination}`;

    if (err) {
      msg = err;
    }

    console.log(msg);

    cb();
  });
});
