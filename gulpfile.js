var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('compile-jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(['www/*.jade', 'www/*/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('www'))
});

gulp.task('default', ['compile-jade']);