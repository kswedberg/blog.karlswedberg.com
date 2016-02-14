require('require-dir')();
var gulp = require('gulp');
// gulp.task('lint', ['lint:js', 'lint:css']);
gulp.task('lint', gulp.parallel('lint:js'));
