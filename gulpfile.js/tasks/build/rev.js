// rev.manifest merge...
// https://github.com/sindresorhus/gulp-rev/issues/83

var path         = require('path');
var config       = require(path.join(process.cwd(), 'gulpfile.js/config'));
var gulp = require('gulp');
var browserSync  = require('browser-sync');
var gulpif       = require('gulp-if');
var rev          = require('gulp-rev');
var jeditor      = require('gulp-json-editor');
var merge        = require('merge-stream');
var jsonDest     = path.join(config.paths.destAssets, 'json');
var jsDest       = path.join(config.paths.destAssets, 'js');
var cssDest      = path.join(config.paths.destAssets, 'css');
var manifestFile = path.join(jsonDest, 'rev-manifest.json');

var unRev = function(json) {
  Object.keys(json).forEach(function(elem) {
    json[elem] = elem;
  });

  return json;
};

var revPipe = function() {
  return rev.manifest(manifestFile, {
    base: jsonDest,
    merge: true
  });
};

gulp.task('build:rev', function() {
  var css = gulp.src(path.join(cssDest, '*.css'))
    .pipe(rev())
    .pipe(gulp.dest(cssDest))
    .pipe(revPipe())
    .pipe(gulpif(browserSync.active, jeditor(unRev)))
    .pipe(gulp.dest(jsonDest));

  var js = gulp.src(path.join(jsDest, '*.js'))
    .pipe(rev())
    .pipe(gulp.dest(jsDest))
    .pipe(revPipe())
    .pipe(gulpif(browserSync.active, jeditor(unRev)))
    .pipe(gulp.dest(jsonDest));

  return merge(css, js);
});

gulp.task('build:unrev', function() {
  return gulp.src(manifestFile)
  .pipe(jeditor(unRev))
  .pipe(gulp.dest(jsonDest));
});

gulp.task('build:rev:restore-manifest', gulp.series(
  'build:rev',
  'build:unrev'
));
