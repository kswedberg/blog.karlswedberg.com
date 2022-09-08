let path         = require('path');
let config       = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp         = require('gulp');

gulp.task('build:sw', () => {
  let path = require('path');
  let swPrecache = require('sw-precache');
  let rootDir = path.basename(config.paths.dest);
  let options = {
    cacheId: config.pkg.name || 'kswedberg',
    staticFileGlobs: [
      `${rootDir}/assets/**/*.{js,html,css,png,jpg,gif,svg,ttf,eot,woff}`,
      `${rootDir}/**/*.html`,
    ],
    dontCacheBustUrlsMatching: /((\w+\-\w+\.(css|js))|\.(svg|ttf|eot|woff))$/,
    handleFetch: process.env.BUILD_ENV === 'production',
    stripPrefix: rootDir,
    verbose: true,
    directoryIndex: 'index.html',
  };

  return swPrecache.write(path.join(config.paths.dest, 'sw.js'), options);
});
