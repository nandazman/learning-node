const gulp          = require('gulp'),
      pump          = require('gulp-plumber'),
      srcmaps       = require('gulp-sourcemaps'),
      concat        = require('gulp-concat'),
      uglify        = require('gulp-terser'),
      header        = require('gulp-header'),
      rename        = require('gulp-rename');

module.exports = function() {
  const opts = {
    name: 'app',
    version: pkg.version,
    comment: '/*! Test Module v<%= version %> | Copyright (c) Xutopia <%= year %>. All rights reserved. */\n',
    sources: [
      'scripts/**/*.js',
    ],
    dest: 'js/',
  };

  return gulp.src(opts.sources)
    .pipe(pump())
    .pipe(srcmaps.init())
    .pipe(concat('module-'+ opts.version + '.' + opts.name + '.js', {newLine: ';'}))
    .pipe(uglify({
      mangle: true,
      compress: true,
    }))
    .pipe(header(opts.comment, { version : opts.version, year: new Date().getFullYear() }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(srcmaps.mapSources(function(sourcePath, file) {
      return 'js/' + opts.name + '/' + sourcePath;
    }))
    .pipe(srcmaps.write('../maps'))
    .pipe(gulp.dest(opts.dest));
};
