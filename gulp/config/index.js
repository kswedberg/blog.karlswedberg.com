let path     = require('path');
let fs       = require('fs');
let rootPath = process.cwd();
let pkg      = require(path.join(rootPath, 'package.json'));

let config = {
  pkg: pkg,
  staticTemplates: true,
  paths: {
    root: rootPath,
    src: path.join(rootPath, 'app'),
    dest: path.join(rootPath, 'public'),
  },
};

config.paths.srcAssets = path.join(config.paths.src, 'assets');
config.paths.destAssets = path.join(config.paths.dest, 'assets');

config.browserSync = require('./browser-sync.js');
config.metalsmith = require('./metalsmith.js')(config);
config.postcss = require('./postcss.js')(config);
config.webpack = require('./webpack.js')(config);

module.exports = config;
