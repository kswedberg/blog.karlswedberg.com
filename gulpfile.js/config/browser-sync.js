var yargs = require('yargs');
var argv = yargs.option('open', {
  alias: 'o',
  default: false
}).argv;

var bsConfig = {
  open: argv.open,
  server: {
    baseDir: 'public',
  },
};

if (process.env.HTTP_HOST) {
  bsConfig.server = false;
  bsConfig.proxy = {
    target: process.env.HTTP_HOST
  };
}

module.exports = bsConfig;
