'use strict';

//******************************************************************************
// Rquires & Variables
//******************************************************************************

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

//******************************************************************************
// Task Runners
//******************************************************************************

// Script Concatenation

gulp.task('concatScripts', ['clean'], function() {
  return gulp.src([
                  'js/circle/autogrow.js',
                  'js/circle/circle.js'])
             .pipe(concat('global.js'))
             .pipe(gulp.dest('js'));
});

// Script Minification

gulp.task('scripts', ['concatScripts'], function() {
  return gulp.src('js/global.js')
             .pipe(uglify())
             .pipe(rename('all.min.js'))
             .pipe(gulp.dest('dist/scripts'))
});

// Scripts sent to 'dist/scripts folder'

// Clean Output before a task

gulp.task('clean', function() {
  del('js/global.js', 'dist');
});

//******************************************************************************
// Default Gulp CMD
//******************************************************************************

gulp.task('default');
