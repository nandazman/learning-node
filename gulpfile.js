const del     = require('del'),
      gulp    = require('gulp'),
      // import from task
      tasks   = require('./tasks/index.js'),
      pkg     = require('./package.json');

const taskFn  = function(name, fn) {
  // name for display function name in gulp task
  fn.displayName = name;
  return fn;
};

const taskJSApp  = taskFn('building-script', tasks.jsApp),
      taskCSSApp = taskFn('building-css', tasks.scssApp);

gulp.task('clean', function() {
  return del([
    'js/module-' + pkg.version + 'app.min.js',
    'js/module-' + pkg.version + 'app.min.css'
  ]);
});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel(
      taskJSApp,
      taskCSSApp
    )
  )
);

gulp.task('watch', gulp.series('build', function watching() {
  gulp.watch('scripts/**/*.js', gulp.series(taskJSApp));
  gulp.watch('scss/**/*.scss', gulp.series(taskCSSApp));
}));
