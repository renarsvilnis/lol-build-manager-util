var gulp       = require('gulp'),
    fs         = require('fs'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({
    entries: './lib/index.js',
    debug: false,
    // builtins     : false,
    insertGlobals: false,
    cache        : {},
    packageCache : {},
    node: true,
    fullPaths    : false
  })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log('Error:', err.message);
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./build'));
});