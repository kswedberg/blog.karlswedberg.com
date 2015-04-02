// rev.manifest merge...
// https://github.com/sindresorhus/gulp-rev/issues/83

var path        = require('path');
var config      = require('config');
var gulp = require('gulp');
var postcss     = require('gulp-postcss');
var browserSync = require('browser-sync');
var gulpif      = require('gulp-if');
var src         = path.join(config.get('paths.src'), 'assets/css/**/*.css');
var dest        = path.join(config.get('paths.dest'), 'assets/css');
var changed     = require('gulp-changed');

gulp.task('build:postcss', 'Run postcss with plugins and save to dest directory', function() {
  var browserSupport = [
    'last 1 version',
    'ie 8',
    'ie 9'
  ];

  var processors = [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-custom-selectors')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-color-hex-alpha')(),
    require('postcss-calc')(),
    require('postcss-assets')({
      basePath: config.get('paths.src'),
      loadPaths: [path.join(config.get('paths.src'), 'assets')]
    }),
  ];

  var processorsProduction = processors.concat([
    require('css-mqpacker')(),
    require('autoprefixer-core')({browsers: browserSupport}),
    require('csswring')()
  ]);

  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(postcss(processors))
    .pipe(gulpif(!config.get('devMode'), postcss(processorsProduction)))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream: true}));
});
