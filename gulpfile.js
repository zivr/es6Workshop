var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var neat = require('node-neat');
var reload = browserSync.reload;

gulp.task('scripts', function() {
    return gulp.src(['js/*.js'])
        .pipe(concat('slidingPuzzle.js'))
        .pipe(gulp.dest('build/js'));
});

/* Sass task */
gulp.task('sass', function () {
    gulp.src('scss/style.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['scss'].concat(neat)
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});

gulp.task('html', () => {
    gulp.src('*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('resources', () => {
    gulp.src(['bower_components/*/dist/*.js','bower_components/*/dist/*.map'])
        .pipe(gulp.dest('build/bower_components/'));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['build/css/*.css', 'build/js/*.js'], {
         server: {
             baseDir: './build/'
         }
    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('serve', ['resources', 'scripts', 'sass', 'html', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['js/**/*.js'], ['scripts']);
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['*.html'], ['html','bs-reload']);
});
