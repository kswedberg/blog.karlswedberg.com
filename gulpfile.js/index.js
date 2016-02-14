var chalk = require('chalk');
var argv = require('yargs')
.option('build-environment', {
  alias: ['b', 'build-env'],
  type: 'string',
})
.argv;

if (!process.env.BUILD_ENV && argv['build-env']) {
  process.env.BUILD_ENV = argv['build-env'];
}

// Warn if still trying to use -d
if (argv.d) {
  console.log(chalk.red('You used the -d flag, which has been removed.'));
  console.log(chalk.yellow('Use `-b [BUILD_ENV]` instead.\n'));
}

// Load env vars from .env
require('dotenv').config({silent: true});

// Normalize BUILD_ENV
process.env.BUILD_ENV = /^dev/i.test(process.env.BUILD_ENV) ? 'development' : 'production';

// Create Browsersync instance
require('browser-sync').create('serve');

// Require tasks
require('./tasks/build');
require('./tasks/clean');
require('./tasks/serve');
require('./tasks/lint');
require('./tasks/deploy');
