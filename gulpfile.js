var gulp = require('gulp'),
path = require('path'),
less = require('gulp-less'),
watch = require('gulp-watch'),
livereload = require('gulp-livereload');


gulp.task('css', function() {
    gulp.src('./app/css/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app/css'));
});


gulp.task('watch', function() {

    gulp.watch('./app/css/less/**/*.less', ['css']);

});



gulp.task('default', ['watch']);