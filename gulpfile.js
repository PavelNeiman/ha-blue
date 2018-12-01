var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    cssnano         = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename          = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
    


gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.+(scss|sass)')    //исходник
        .pipe(sass())                        //команда
        .pipe(gulp.dest('app/css'))          //результирующая директория
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'

        },
        notify: false
    })
})


gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/***.js', browserSync.reload);

})