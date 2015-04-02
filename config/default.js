var cwd = process.cwd();
var path = require('path');
var Bootstrap = require('./lib/bootstrap');
var bs = new Bootstrap();
var pkg = require(path.join(cwd, 'package.json'));

bs.setEnv();

var config = {
  devMode: true,
  pkg: pkg,
  bootstrap: bs,
  env: bs.getEnv(),
  paths: {
    root: cwd,
    src: path.join(cwd, 'app'),
    dest: path.join(cwd, 'public'),
  },
  metalsmith: require('./metalsmith'),
  webpack: require('./webpack'),
  browserSync: {
    open: false,
    server: {
      baseDir: 'public',
    },
  }
};

module.exports = config;
