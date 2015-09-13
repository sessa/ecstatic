var gulp = require('gulp');
var jade = require( 'gulp-jade' );
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');

var replaceFiles = ['./www/js/app.js'];
var paths = {
  jade: ['./www/**/*.jade', '!./www/lib{,/**}'],
  js: ['./www/**/*.js', '!./www/lib{,/**}'],
  css: ['./www/**/*.css']
};

//copy over jade 
gulp.src(['www/**/*.jade']).pipe(gulp.dest('dist'));
//copy over lib 
gulp.src(['www/lib{,/**}']).pipe(gulp.dest('dist'));


gulp.task('jade', function (done) {
  	gulp.src(paths.jade)
    .pipe(jade().on('error', gutil.log))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('www'))
    .on('end', done);
});

gulp.task('minify-js', function () {
    gulp.src(paths.js) 
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(minifyCss({compatibility: 'ie8'}).on('error', gutil.log))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch( paths.jade, ['jade'] );
});

gulp.task('default', ['jade', 'minify-js', 'minify-css']);
