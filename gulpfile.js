// Build Process

var gulp = require('gulp');
var jade = require( 'gulp-jade' );

var paths = {
  jade: ['./www/*.jade', './www/*/*.jade', , '!./www/lib{,/**}'],
};

//compile Jade files to html
gulp.task('jade', function (done) {
  	gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('www'))
    .on('end', done);
});

gulp.task('default', ['jade']);