require('require-dir')();
let gulp = require('gulp');

// gulp.task('lint', ['lint:js', 'lint:css']);
gulp.task('lint', gulp.parallel('lint:js'));
