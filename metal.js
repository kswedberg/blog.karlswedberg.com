var MetalSmith = require('metalsmith');
var path = require('path');
var commands = require('commander');
var metalsmith = new MetalSmith(__dirname);
var branch = require('metalsmith-branch');
var config, configFile, plugins;

commands
.option('-c, --config [configFile]', 'The configFile(.js) to use [default]', 'default')
.option('-d, --dir [configDirectory]', 'Directory where config files are stored [config]', 'config')
.option('-p --postcss', 'Run the postcss processor')
.option('-v, --verbose', 'Verbose output mode');

commands.on('--help', function() {
  console.log('That\'s it!');
});
commands.parse(process.argv);

commands.config = commands.config === 'dev' ? 'development' : commands.config;
commands.config = commands.config === 'live' ? 'production' : commands.config;

configFile = path.join(__dirname, commands.dir, commands.config);

config = require(configFile);
plugins = config.plugins;

if (commands.postcss) {
  console.log('Running postcss');
  require('./config/postcss')();

  return;
}

var build = function() {
  config.metadata.url = config.metadata.siteUrl;

  metalsmith
  .source(config.source)
  .destination(config.destination)

  .metadata(config.metadata)

  // Need to call .clean(false) so assets won't be overwritten
  .clean(false);

  if (commands.verbose) {
    console.log('Processing files through %d plugins:', plugins.length);
    console.log(plugins.map(function(plugin) {
      return plugin.module;
    }));
  }

  plugins.forEach(function(plugin) {
    var mod = require(plugin.module);

    if (plugin.branch) {
      metalsmith.use(branch(plugin.branch).use(mod(plugin.options)));
    } else {
      metalsmith.use(mod(plugin.options));
    }
  });

  metalsmith.build(function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Finished building into', config.destination);
  });
};

module.exports = build;
