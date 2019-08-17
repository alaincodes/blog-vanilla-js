const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// Scss to CSS
function style() {
  // 1 where is my scss file
  return (
    gulp
      .src("./src/scss/**/*.scss")
      // 2 pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3 where do i save the compiled css?
      .pipe(gulp.dest("./src/css"))
      // 4 stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
