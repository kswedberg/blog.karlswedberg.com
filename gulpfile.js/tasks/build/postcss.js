// // rev.manifest merge...
// // https://github.com/sindresorhus/gulp-rev/issues/83
//
// var path        = require('path');
// var config      = require(path.join(process.cwd(), 'gulpfile.js/config'));
// var gulp        = require('gulp');
// var postcss     = require('gulp-postcss');
// var browserSync = require('browser-sync');
// var gulpif      = require('gulp-if');
// var src         = path.join(config.paths.srcAssets, 'css/**/*.css');
// var dest        = path.join(config.paths.destAssets, 'css');
// var changed     = require('gulp-changed');
// var devMode     = process.env.BUILD_DEV === 'development';
//
// // 'Run postcss with plugins and save to dest directory'
// gulp.task('build:postcss', function() {
//   var browserSupport = [
//     'last 1 version',
//     'ie 8',
//     'ie 9'
//   ];
//
//   var processors = [
//     require('postcss-import')(),
//     require('postcss-mixins')(),
//     require('postcss-nested')(),
//     require('postcss-custom-selectors')(),
//     require('postcss-custom-properties')(),
//     require('postcss-custom-media')(),
//     require('postcss-color-hex-alpha')(),
//     require('postcss-calc')(),
//     require('postcss-assets')({
//       basePath: config.paths.src,
//       loadPaths: [config.paths.srcAssets]
//     }),
//   ];
//
//   var processorsProduction = processors.concat([
//     require('css-mqpacker')(),
//     require('autoprefixer-core')({browsers: browserSupport}),
//     require('csswring')()
//   ]);
//
//   return gulp.src(src)
//     .pipe(changed(dest))
//     .pipe(postcss(processors))
//     .pipe(gulpif(!devMode, postcss(processorsProduction)))
//     .pipe(gulp.dest(dest))
//     .pipe(browserSync.reload({stream: true}));
// });
