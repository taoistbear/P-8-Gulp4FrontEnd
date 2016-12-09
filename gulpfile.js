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

gulp.task('scripts', ['clean'], function() {
  return gulp.src([
                  'js/circle/autogrow.js',
                  'js/circle/circle.js'])
             .pipe(concat('global.js'))
             .pipe(gulp.dest('js'))
             // Script Minification
             .pipe(uglify())
             .pipe(rename('all.min.js'))
             // Scripts sent to 'dist/scripts folder'
             .pipe(gulp.dest('dist/scripts'));
});

// Compile sass

gulp.task('styles', ['clean'], function() {
  return gulp.src('sass/global.scss')
             .pipe(sass({outputStyle: 'compressed'}))
             .pipe(rename('all.min.css'))
             // Sass sent to 'dist/styles' foler
             .pipe(gulp.dest('dist/sytles'))
});





// Clean Output before a task

gulp.task('clean', function() {
  del(['js/global.js', 'dist']);
});

//******************************************************************************
// Default Gulp CMD
//******************************************************************************

gulp.task('default');
