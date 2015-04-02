var requireDir = require('require-dir');

// Set inital environment
require('../config/default');

// Require all tasks
require('gulp-help')(require('gulp', {
  aliases: ['h']
}));
requireDir('./tasks', { recurse: true });
