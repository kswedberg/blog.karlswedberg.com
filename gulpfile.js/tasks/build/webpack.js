var config        = require('config');
var gulp = require('gulp');
var gulpWebpack   = require('gulp-webpack');
var webpack       = require('webpack');

// Because gulpWebpack wants to change our immutable config
var webpackConfig = config.util.cloneDeep(config.get('webpack'));

gulp.task('build:webpack', function() {
  return gulp.src('entry.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(webpackConfig.output.path));
});
