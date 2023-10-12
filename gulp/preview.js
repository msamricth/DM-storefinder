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




const font = ({
  gulp,
  config,
  plugins,
  taskTarget
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''), dir.font);

  gulp.task('font', () => {
    return gulp
      .src(path.join(
        dir.source,
        dir.asset,
        dir.font,
        gulpConfig.fileExpression.font
      ))
      .pipe(plugins.changed(dest))
      // .pipe(plugins.debug())

      // Fix for Windows 10 and gulp acting crazy
      .pipe(plugins.rename(file => {
        fixWindows10GulpPathIssue({file, dest, plugins, config})
      }))
      // .pipe(plugins.debug())
      .pipe(gulp.dest(dest));
  });
};
