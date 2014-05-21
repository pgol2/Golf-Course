var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    zip = require('gulp-zip'),
    ftp = require('gulp-ftp');


gulp.task('css', function() {
    gulp.src('./app/css/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app/css'));
});


gulp.task('watch', function() {
    gulp.watch('./app/css/less/**/*.less', ['css']);
});

gulp.task('zip', function() {
    return gulp.src('app/**/*')
            .pipe(zip('scorm.zip'))
            .pipe(gulp.dest('zip'));
});

gulp.task('ftp', function() {
    return gulp.src('app/**/*')
                .pipe(ftp({
                    host: 'golczi.vdl.pl',
                    user: 'golczi',
                    pass: 'warkamu',
                    remotePath: '/scorm'
                }));
});



gulp.task('default', ['watch']);