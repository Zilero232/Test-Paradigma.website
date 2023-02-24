import gulp from "gulp";
import browserSync from "browser-sync";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rename from "gulp-rename";
import del from "del";
import autorefixer from "gulp-autoprefixer";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

/*=================================Очистка=========================================*/
gulp.task("clean", async function () {
  del.sync("dist");
});

/*====================Перенос нужных файлов в новую папку=====================================*/
gulp.task("export", async function () {
  let buildHTML = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  let buildCSS = gulp.src("app/css/*.css").pipe(gulp.dest("dist/css"));
  let buildJS = gulp.src("app/js/*.js").pipe(gulp.dest("dist/js"));
  let buildFONTS = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
  let buildIMAGES = gulp
    .src("app/images/**/*.*")
    .pipe(gulp.dest("dist/images"));
});
gulp.task("build", gulp.series("clean", "export"));

/*====================Соединение и сжатие файлов js, css в один=====================================*/
gulp.task("js", function () {
  return gulp
  .src([
    "node_modules/imask/dist/imask.js",
  ])
  .pipe(concat("libs.min.js"))
  .pipe(gulp.dest("app/js"))
  .pipe(browserSync.reload({ stream: true }));
});
gulp.task("css", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss"))
    .pipe(browserSync.reload({ stream: true }));
});

/*====================автоматический реалод браузера=====================================*/
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

/*====================конвертирование из scss=====================================*/
gulp.task("scss", function () {
  return gulp
    .src("app/scss/style.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autorefixer({}))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});
gulp.task("script", function () {
  return gulp.src("app/js/**/*.js").pipe(browserSync.reload({ stream: true }));
});

/*====================автоматчиское слежение за изменениями=====================================*/
gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/**/*.js", gulp.parallel("script"));
});

gulp.task(
  "default",
  gulp.parallel("css", "scss", "js", "browser-sync", "watch")
);
