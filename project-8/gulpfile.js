const CSS_SYNTAX = 'scss'; // Syntax: sass or scss;

const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const minify = require('gulp-minify');
const plumber = require('gulp-plumber');
const fileRename = require('gulp-rename');
const babel = require('gulp-babel');

const JS_FILE_NAME = {
  basename: "main",
  suffix: "-",
  extname: "min.js"
}

function createServer() {
  return browsersync({
    server: {
        baseDir: 'dist/'
    },
    notify: false
  });
}

function html() {
  return gulp
    .src(`dev/index.html`)
    .pipe(plumber())
    .pipe(gulp.dest(`dist/`))
    .pipe(browsersync.reload({ stream: true }));
}

function styles() {
  return gulp
    .src(`dev/${ CSS_SYNTAX }/styles.${ CSS_SYNTAX }`)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([
      require('postcss-preset-env')(),
      require('cssnano')
    ]))
    .pipe(gulp.dest(`dist/css`))
    .pipe(browsersync.reload({ stream: true }));
}

function scripts() {
  return gulp
    .src(`dev/js/main.js`)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify({
      noSource: true,
      ext: {
        src: 'min.js',
        min: '.js'
      }
    }))
    .pipe(fileRename(JS_FILE_NAME))
    .pipe(gulp.dest(`dist/js`))
    .pipe(browsersync.reload({ stream: true }));
}

function images() {
  return gulp
    .src(`dev/img/`)
    .pipe(gulp.dest(`dist/img`))
    .pipe(browsersync.reload({ stream: true }));
}

function watch() {
  html();
  styles();
  scripts();
  images();

  gulp.watch(`dev/index.html`, html);
  gulp.watch(`dev/${ CSS_SYNTAX }/*.${ CSS_SYNTAX }`, styles);
  gulp.watch(`dev/js/*.js`, scripts);
  gulp.watch(`dev/img`, images);
}

exports.default = gulp.parallel(createServer, watch);