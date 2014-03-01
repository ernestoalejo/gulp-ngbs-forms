'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint');

gulp.task('default', ['lint', 'test']);

gulp.task('test', function() {
  return gulp.src(['test/**/test-*.js'], {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'test/**/*.js', 'index.js'])
    .pipe(jshint('jshint.json'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
