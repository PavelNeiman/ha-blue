var gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.+(scss|sass)')    //исходник
        .pipe(sass())                        //команда
        .pipe(gulp.dest('app/css'))          //результирующая директория
});


gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.+(scss|sass)', ['sass'])
})