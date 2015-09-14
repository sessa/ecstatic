// Build Process

var gulp = require('gulp');
var jade = require( 'gulp-jade' );

var paths = {
  jade: ['./www/*.jade', './www/*/*.jade', , '!./www/lib{,/**}'],
};

//compile Jade files to html
gulp.task('jade', function (done) {
	console.log("asdf");
  	gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('www'))
    .on('end', done);
});

gulp.task('watch', function() {
	gulp.watch(paths.jade, ['jade']);
});

gulp.task('default', ['jade']);