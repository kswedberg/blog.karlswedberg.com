var requireDir = require('require-dir');

// Set inital environment
require('../config/default');

// Require gulp help, which transforms gulp and its args
require('gulp-help')(require('gulp', {
  aliases: ['h']
}));

// Require all tasks
requireDir('./tasks', { recurse: true });
