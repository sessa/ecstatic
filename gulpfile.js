// Build Process

var gulp = require('gulp');
var jade = require( 'gulp-jade' );
var uglify = require('gulp-uglifyjs');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var stripDebug = require('gulp-strip-debug');
var jslint = require('gulp-jslint');
var templateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');

var replaceFiles = ['./www/js/app.js'];
var paths = {
  jade: ['./www/*.jade', './www/*/*.jade', , '!./www/lib{,/**}'],
  html: ['./www/*.html', './www/*/*.html', , '!./www/lib{,/**}'],
  js: ['./www/*.js', './www/*/*.js', , '!./www/lib{,/**}'],
  templatecache: ['./www/*/*.html', './www/*.html', '!./www/lib{,/**}']
};

//copy over png 
gulp.src(['www/**/*.png']).pipe(gulp.dest('www/dist'));
//copy over lib 
gulp.src(['www/lib{,/**}']).pipe(gulp.dest('www/dist'));

//jslint
//minify a JS File

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


//concatenate the js files

gulp.task('useref', ['jade'], function (done) {
	var assets = useref.assets();

	gulp.src('www/index.html')
	  .pipe(assets)
	  .pipe(assets.restore())
	  .pipe(useref())
	  .pipe(gulp.dest('www/dist'))
	  .on('end', done);
});


gulp.task('watch', function() {
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.templatecache, ['templatecache']);
	gulp.watch(paths.useref, ['useref']);
});

gulp.task('default', ['jade', 'templatecache', 'useref']);
