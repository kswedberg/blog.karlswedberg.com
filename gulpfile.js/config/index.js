var path     = require('path');
var fs       = require('fs');
var rootPath = process.cwd();
var pkg      = require(path.join(rootPath, 'package.json'));

var config = {
  pkg: pkg,
  staticTemplates: true,
  paths: {
    root: rootPath,
    src: path.join(rootPath, 'app'),
    dest: path.join(rootPath, 'public'),
  },
};

config.paths.srcAssets  = path.join(config.paths.src, 'assets');
config.paths.destAssets = path.join(config.paths.dest, 'assets');

config.browserSync = require('./browser-sync');
config.metalsmith  = require('./metalsmith')(config);
config.postcss     = require('./postcss')(config);
config.webpack     = require('./webpack')(config);

module.exports = config;
