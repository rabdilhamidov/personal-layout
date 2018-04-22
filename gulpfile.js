var scr_path = "src";
var dist_path = 'smf2.lo/web';

var autoprefixer = require('gulp-autoprefixer');
var beeper = require('beeper');
// var browserSync = require('browser-sync'); // Not works here!
var cache = require('gulp-cache');
var cleanCSS = require('gulp-clean-css');
var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// var imagemin = require('gulp-imagemin');
// var gconcat = require('gulp-concat');
// var minifycss = require('gulp-minify-css')
// var zip = require('gulp-zip');
// 
// sudo npm install gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify --save-dev


var onError = function (err) { // Custom error msg with beep sound and text color
  notify.onError({
    title: "Gulp error in " + err.plugin,
    message: err.toString()
  })(err);
  beeper(3);
  this.emit('end');
  gutil.log(gutil.colors.red(err));
};


gulp.task('styles', function () {
  gulp.src(scr_path + '/styles/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    // .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: true }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dist_path + '/css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist_path + '/css'));
});

gulp.task('default', function () {
  gulp.start('watch');
});

gulp.task('setup', function () {
  gulp.start('styles');
});


gulp.task('watch', function () {
  gulp.watch(scr_path + '/styles/**/*', ['styles']);

  // init server
  // browserSync.init({
  //   server: {
  //     proxy: "local.build",
  //     baseDir: "./"
  //   }
  // });

  // gulp.watch([dist_path + '/**'], browserSync.reload);
});
