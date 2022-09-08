// rev.manifest merge...
// https://github.com/sindresorhus/gulp-rev/issues/83

let path         = require('path');
let config       = require(path.join(process.cwd(), 'gulp/config/index.js'));
let gulp = require('gulp');
let browserSync  = require('browser-sync');
let gulpif       = require('gulp-if');
let rev          = require('gulp-rev');
let jeditor      = require('gulp-json-editor');
let merge        = require('merge-stream');
let jsonDest     = path.join(config.paths.destAssets, 'json');
let jsDest       = path.join(config.paths.destAssets, 'js');
let cssDest      = path.join(config.paths.destAssets, 'css');
let manifestFile = path.join(jsonDest, 'rev-manifest.json');

let unRev = function(json) {
  Object.keys(json).forEach((elem) => {
    json[elem] = elem;
  });

  return json;
};

let revPipe = function() {
  return rev.manifest(manifestFile, {
    base: jsonDest,
    merge: true,
  });
};

gulp.task('build:rev', () => {
  let css = gulp.src(path.join(cssDest, '*.css'))
  .pipe(rev())
  .pipe(gulp.dest(cssDest))
  .pipe(revPipe())
  .pipe(gulpif(browserSync.active, jeditor(unRev)))
  .pipe(gulp.dest(jsonDest));

  let js = gulp.src(path.join(jsDest, '*.js'))
  .pipe(rev())
  .pipe(gulp.dest(jsDest))
  .pipe(revPipe())
  .pipe(gulpif(browserSync.active, jeditor(unRev)))
  .pipe(gulp.dest(jsonDest));

  return merge(css, js);
});

gulp.task('build:unrev', () => {
  return gulp.src(manifestFile)
  .pipe(jeditor(unRev))
  .pipe(gulp.dest(jsonDest));
});

gulp.task('build:rev:restore-manifest', gulp.series(
  'build:rev',
  'build:unrev'
));
