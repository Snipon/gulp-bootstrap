// Plugins.
var gulp        = require('gulp'),
    livereload  = require('gulp-livereload'),
    compass     = require('gulp-compass'),
    path        = require('path'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require('gulp-notify'),
    gutil       = require('gulp-util');

// File paths.
var paths = {
  js: 'js/cs/*.coffee',
  css: 'css/*.css',
  sass: 'css/sass/*.scss',
  vendorAssets: [
    'vendor/jquery/dist/jquery.js',
    'vendor/underscore/underscore.js',
    'vendor/backbone/backbone.js'
  ]
};

// Compass.
gulp.task('compass', function () {
  gulp.src('./css/sass/*.scss')
    .pipe(compass({
      css: 'css',
      sass: 'css/sass',
      logging: false,
      style: 'compressed'
    }).on('error', gutil.log))
    .pipe(gulp.dest('temp')
  );
});

// Libraries.
gulp.task('vendorjs', function () {
  gulp.src(paths.vendorAssets)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js')
  );
});

// Coffeescript.
gulp.task('coffee', function () {
  gulp.src('js/cs/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(uglify())
    .pipe(gulp.dest('js')
  );
});

// Watch.
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.js, ['coffee']);
  gulp.watch(paths.sass, ['compass']);
  gulp.watch(paths.css).on('change', livereload.changed);
});

// Launch.
gulp.task('default', ['vendorjs', 'coffee', 'compass', 'watch']);
