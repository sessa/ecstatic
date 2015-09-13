var gulp = require('gulp');
var jade = require( 'gulp-jade' );
var uglify = require('gulp-uglifyjs');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var jslint = require('gulp-jslint');
var templateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');

var replaceFiles = ['./www/js/app.js'];
var paths = {
  jade: ['./www/**/*.jade', '!./www/lib{,/**}'],
  js: ['./www/*.js', './www/*/*.js'],
  templatecache: ['./www/**/*.html', '!./www/lib{,/**}'],
  useref: ['./dist/**/*.html']
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

//compile Jade files to html
gulp.task('jade', function (done) {
  	gulp.src(paths.jade)
    .pipe(jade().on('error', gutil.log))
    .pipe(gulp.dest('www'))
    .on('end', done);
});

//concatenate the templates and put it in dist 
gulp.task('templatecache', ['jade'], function (done) {
gulp.src(paths.templatecache)
  .pipe(templateCache({standalone:true}))
  .pipe(gulp.dest('www/dist'))
  .on('end', done);
});

//NG-Annotate. Ensure all the module imports are there for Dependency injection. Shortens code.

//minify and concatene the JS File
gulp.task('uglify', function () {
    gulp.src(paths.js) 
    .pipe(uglify('app.min.js', 
    	{ outSourceMap: true, output: { beautify: true }})
    	.on('error', gutil.log))
    .pipe(gulp.dest('www/dist'));
});


gulp.task('watch', function() {
	gulp.watch(paths.jade, ['build']);
});

gulp.task('build', ['jade', 'templatecache', 'uglify', 'minify-css']);
