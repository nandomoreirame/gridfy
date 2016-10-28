'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

const $ = plugins();

const dirs = {
  src: './sass',
  dest: './dist'
};

gulp.task('stylesheets', () => {
  return gulp.src([`${dirs.src}/*.sass`])
    .pipe($.plumber({
      errorHandler: $.notify.onError({
        title   : 'Gulp',
        message : 'Error: <%= error.message %>'
      })
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      sourcemap: true,
      sourceComments: false,
      includePaths: [
        `${dirs.src}/`
      ]
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dirs.dest))
    .pipe($.cssnano())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.size({
      title: 'Stylesheets',
      gzip: false,
      showFiles: true
    }))
    .pipe(gulp.dest(dirs.dest))
    .pipe($.plumber.stop());
})
.task('watch', () => {
  gulp.watch(`${dirs.src}/**/*.{sass,scss}`, ['stylesheets']);
})
.task('build', ['stylesheets'])
.task('default', ['build', 'watch']);