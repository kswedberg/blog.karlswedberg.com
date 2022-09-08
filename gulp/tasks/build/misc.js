let path    = require('path');
let config  = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp = require('gulp');
let changed = require('gulp-changed');
let merge = require('merge-stream');

let src     = [
  path.join(config.paths.src, '*.{html,ico}'),
];
let dest = config.paths.dest;

let assetsDest    = config.paths.destAssets;
let assetsSrc = [
  path.join(config.paths.srcAssets, '**/*'),
  `!${path.join(config.paths.srcAssets, '{css,img,js}/**/*')}`,
];

// 'Copy files that are not processed some other way into dest'
gulp.task('build:misc', () => {
  let rootFiles = gulp.src(assetsSrc)
  .pipe(changed(assetsDest))
  .pipe(gulp.dest(assetsDest));

  let assets = gulp.src(src)
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));

  return merge(rootFiles, assets);
});
