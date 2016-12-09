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
imagemin = require('gulp-imagemin'),
     del = require('del');

//******************************************************************************
// Task Runners
//******************************************************************************

// Script Concatenation

gulp.task('scripts', function() {
  return gulp.src([
                  'js/circle/autogrow.js',
                  'js/circle/circle.js'])
             .pipe(concat('global.js'))
             .pipe(gulp.dest('js'))
             // Sourcemap Init
             .pipe(maps.init())
             // Script Minification
             .pipe(uglify())
             .pipe(rename('all.min.js'))
             // Sourcemap Write
             .pipe(maps.write('./'))
             // Scripts sent to 'dist/scripts folder'
             .pipe(gulp.dest('dist/scripts'));
});

// Compile Sass

gulp.task('styles', function() {
  return gulp.src('sass/global.scss')
             .pipe(sass({outputStyle: 'compressed'}))
             // Sourcemap Init
             .pipe(maps.init())
             .pipe(rename('all.min.css'))
             // Sourcemap Write
             .pipe(maps.write('./'))
             // Sass sent to 'dist/styles' foler
             .pipe(gulp.dest('dist/sytles'));
});

// Minify Image files

gulp.task('images', function() {
  return gulp.src(['images/*.jpg', 'images/*.png'])
             .pipe(imagemin())
             .pipe(gulp.dest('dist/images'));
});

// Clean output before a task

gulp.task('clean', function() {
  del('dist');
});

// Build Command

gulp.task('build', ['scripts', 'styles', 'images'], function() {
  return gulp.src('index.html')
             .pipe(gulp.dest('dist'));
})

//******************************************************************************
// Default Gulp CMD
//******************************************************************************

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
