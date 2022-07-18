const { src, watch, dest, parallel } = require('gulp')
const plumber = require('gulp-plumber')
const prefix = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))

function browserSyncTask() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })

  watch('./src/views/**/*.pug', htmlTask)
  watch('./src/scss/**/*.scss', cssTask)
  watch('./src/js/**/*.js', browserSync.reload)
}

function htmlTask() {
  return src('./src/views/*.pug')
    .pipe(pug())
    .pipe(dest('./'))
    .on('end', browserSync.reload)
}

function cssTask() {
  return src('./src/scss/main.scss')
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass())
    .pipe(prefix())
    .pipe(dest('./'))
    .pipe(browserSync.stream())
}

exports.default = parallel(browserSyncTask, htmlTask, cssTask)
