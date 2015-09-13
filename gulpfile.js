var gulp = require('gulp');
var jade = require( 'gulp-jade' );
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var jslint = require('gulp-jslint');
var templateCache = require('gulp-angular-templatecache');

var replaceFiles = ['./www/js/app.js'];
var paths = {
  jade: ['./www/**/*.jade', '!./www/lib{,/**}'],
  js: ['./www/**/*.js', '!./www/lib{,/**}'],
  css: ['./www/**/*.css', '!./www/lib{,/**}'],
  templatecache: ['./dist/**/*.html', '!./dist/lib{,/**}']
};

//copy over jade 
gulp.src(['www/**/*.jade']).pipe(gulp.dest('dist'));
//copy over png 
gulp.src(['www/**/*.png']).pipe(gulp.dest('dist'));
//copy over lib 
gulp.src(['www/lib{,/**}']).pipe(gulp.dest('dist'));

gulp.task('jslint', function () {
    return gulp.src(paths.js)
         .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            white: true,
            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('jade', function (done) {
  	gulp.src(paths.jade)
    .pipe(jade().on('error', gutil.log))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('www'))
    .on('end', done);
    	console.log("jade finished");
});

gulp.task('templatecache', ['jade'], function (done) {
gulp.src(paths.templatecache)
  .pipe(templateCache({standalone:true}))
  .pipe(gulp.dest('www/templates'))
  .on('end', done);
});

gulp.task('minify-js', function () {
    gulp.src(paths.js) 
    //.pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(minifyCss({compatibility: 'ie8'}).on('error', gutil.log))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.templatecache, ['templatecache']);
});

gulp.task('default', ['jade', 'templatecache', 'minify-js', 'minify-css']);
