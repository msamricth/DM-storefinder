import gulp from 'gulp';

function preview(){
    gulp.task("preview", () => {
        return gulp.src('./_asset/_preview/*.png').pipe(gulp.dest('./asset/preview')),
        gulp.src('./_asset/_preview/*.svg').pipe(gulp.dest('./asset/preview'));
    });
}
export default preview;
