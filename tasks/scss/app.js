const gulp          = require('gulp'),
      pump          = require('gulp-plumber'),
      srcmaps       = require('gulp-sourcemaps'),
      sass          = require('gulp-sass'),
      header        = require('gulp-header'),
      rename        = require('gulp-rename');
      sass.compiler = require('node-sass'),
      pkg           = require('../../package.json');

module.exports = function() {
  const opts = {
    name: pkg.name,
    version: pkg.version,
    comment: '/*! Test Module v<%= version %> | Copyright (c) Xutopia <%= year %>. All rights reserved. */\n',
    prefix: true,
    sources: [
      'scss/app.scss',
    ],
    dest: 'css/'
  };

  return gulp.src(opts.sources)
    .pipe(pump())
    .pipe(srcmaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(header(opts.comment, { version : opts.version, year: new Date().getFullYear() }))
    .pipe(rename({
      prefix: opts.prefix ? 'module-' + opts.version + '.' : null,
      extname: '.min.css'
    }))
    .pipe(srcmaps.mapSources(function(sourcePath, file) {
      return 'css/' + sourcePath;
    }))
    .pipe(srcmaps.write('../maps'))
    .pipe(gulp.dest(opts.dest));
};
