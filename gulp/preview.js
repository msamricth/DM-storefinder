import gulp from 'gulp';
import path from 'path';
import gulpConfig from './util/config';
import { fixWindows10GulpPathIssue } from './util/util';
const preview = ({
    gulp,
    config,
    plugins,
    taskTarget
  }) => {
    gulp.task("preview", () => {
        return gulp.src('./_asset/_preview/*.png').pipe(gulp.dest('./asset/preview')),
        gulp.src('./_asset/_preview/*.svg').pipe(gulp.dest('./asset/preview'));
    });
}
export default preview;