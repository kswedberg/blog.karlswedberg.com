var path         = require('path');
var config       = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp         = require('gulp');

gulp.task('build:sw', function() {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = path.basename(config.paths.dest);
  var options = {
    cacheId: config.pkg.name || 'kswedberg',
    staticFileGlobs: [
      rootDir + '/assets/**/*.{js,html,css,png,jpg,gif,svg,ttf,eot,woff}',
      rootDir + '/**/*.html'
    ],
    dontCacheBustUrlsMatching: /((\w+\-\w+\.(css|js))|\.(svg|ttf|eot|woff))$/,
    handleFetch: process.env.BUILD_ENV === 'production',
    stripPrefix: rootDir,
    verbose: true,
    directoryIndex: 'index.html',
  };

  return swPrecache.write(path.join(config.paths.dest, 'sw.js'), options);
});
