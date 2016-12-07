'use strict';

var gulp = require('gulp');
var fs = require('fs');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');
var jasmine = require('gulp-jasmine');

gulp.task('test', function() {
  gulp.src('source/spec/test.js')
    .pipe(jasmine());
})

gulp.task('css', function() {
  gulp.cleanDir('public/css/');
  return gulp.src('source/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('js', function() {
  gulp.cleanDir('public/js/');
  return gulp.src('source/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglifyjs())
    .pipe(jshint())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('images', function() {
  gulp.src('source/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img/'));
});

gulp.cleanDir = function(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function(file, index) {
      var curPath = dir + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

gulp.task('watch', function() {
  gulp.watch('source/spec/test.js', ['test']);
  gulp.watch('source/scss/**/*.scss', ['css']);
  gulp.watch('source/js/**/*.js', ['js']);
});

gulp.task('default', ['test', 'css', 'js', 'images']);
