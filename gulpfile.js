var dest = './smf2.lo/web/';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    // notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    ngmin = require('gulp-ngmin'),
    lr = require('tiny-lr'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect');
var server = lr();
var sprite = require('css-sprite').stream;

gulp.task('styles', function () {
  return gulp.src('src/styles/style.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dest + 'css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(dest + 'css'))
    // .pipe(notify({ message: 'Styles task complete' }))
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(ngmin())
    .pipe(gulp.dest(dest + 'js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(dest + 'js'))
    // .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  return gulp.src('src/images/*.*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'images'))
    // .pipe(notify({ message: 'Images task complete' }))
    .pipe(connect.reload());
});

gulp.task('clean', function () {
  // return gulp.src(['../src/Demos/BlogBundle/Resources/public/css', '../src/Demos/BlogBundle/Resources/public/js', '../src/Demos/BlogBundle/Resources/public/images'], {read: false})
  //   .pipe(clean({force: true}));
});

gulp.task('sprites', function () {
  return gulp.src('./src/images/ico/*.png')
    .pipe(sprite({
      name: 'sprite.png',
      style: '_sprite.scss',
      cssPath: '../images',
      processor: 'scss'
    }))
    .pipe(gulpif('*.png', gulp.dest(dest + 'images/'), gulp.dest('src/styles/')));
});

gulp.task('html', function () {
  gulp.src('./html/*.html')
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    port: 8888,
    livereload: true
  });
});

gulp.task('lr-server', function () {
    server.listen(35729, function (err) {
        if(err) return console.log(err);
    });
});

gulp.task('default', ['connect', 'clean'], function () {
    gulp.start('sprites', 'styles', 'scripts', 'images', 'watch');
});

gulp.task('watch', function () {

  gulp.watch('src/styles/**/*.scss', ['styles']);

  gulp.watch('src/scripts/**/*.js', ['scripts']);

  gulp.watch('src/images/**/*', ['images']);

  gulp.watch('src/images/ico/*.png', ['sprites']);

  gulp.watch('./html/*.html', ['html']);

});
