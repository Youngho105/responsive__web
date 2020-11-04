import gulp, { watch } from "gulp";
import sass from "gulp-sass";
import miniCss from "gulp-csso";
import ws from "gulp-webserver";
import autoprefixer from "gulp-autoprefixer";
import del from "del";
import ghpages from "gh-pages";

sass.compiler = require('node-sass');

const routes = {
  scss: {
    src: "src/scss/style.scss",
    watch: "src/scss/**/*.scss",
    dest: "build/css"
  }
}

const gwatch = () =>
  gulp.watch(routes.scss.watch, styles);

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCss())
    .pipe(gulp.dest(routes.scss.dest));

const gh = () => gulp.src('build/**/*').pipe(ghpages());

const webserver = () => gulp.src("build").pipe(ws({
  livereload: true,
  open: true
}))

const clean = () => del(["build"]);
const prepare = gulp.series([clean]);
const live = gulp.parallel([gwatch, webserver])
const assets = gulp.series([styles]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);