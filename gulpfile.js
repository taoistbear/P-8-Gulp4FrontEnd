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
     del = require('del'),
  eslint = require('gulp-eslint');

//******************************************************************************
// Task Runners
//******************************************************************************

// Script Concatenation

gulp.task('scripts', () =>  {
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

gulp.task('styles', () =>  {
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

gulp.task('images', () =>  {
  return gulp.src(['images/*.jpg', 'images/*.png'])
             .pipe(imagemin())
             .pipe(gulp.dest('dist/images'));
});

// Clean output before a task

gulp.task('clean', () =>  {
  del('dist');
});

// ESLint

gulp.task('lint', ['scripts'], () => {
  return gulp.src('js/global.js')
             .pipe(eslint())
             .pipe(eslint.result(result => {
                  // Called for each ESLint result.
                  console.log(`ESLint result: ${result.filePath}`);
                  console.log(`# Messages: ${result.messages.length}`);
                  console.log(`# Warnings: ${result.warningCount}`);
                  console.log(`# Errors: ${result.errorCount}`);
              }));
});

// Build Command

gulp.task('build', ['lint', 'styles', 'images'], function() {
  return gulp.src('index.html')
             .pipe(gulp.dest('dist'));
})


//******************************************************************************
// Default Gulp CMD
//******************************************************************************

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
