const gulp = require("gulp");
// const sass = require("gulp-sass");
const sass = require("gulp-dart-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const prefix = require('gulp-autoprefixer');

var twig = require('gulp-twig');

// sass.compiler = require("node-sass");

const stylesDev = "./app/sass/**/*.sass",
    stylesAll = [
        // './node_modules/bootstrap/dist/css/bootstrap.min.css',
        // "./node_modules/animate.css/animate.min.css",
        // "./node_modules/swiper/swiper-bundle.css",
        "./app/sass/**/*.sass",
    ],
    scriptsDev = "./app/js/**/*.js",
    scriptsAll = [
        // "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/@popperjs/core/dist/umd/popper.min.js",
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        // "./node_modules/swiper/swiper-bundle.min.js",
        // "./node_modules/slick-carousel/slick/slick.min.js",
        // "./node_modules/typed.js/lib/typed.min.js",
        // "./node_modules/wow.js/dist/wow.min.js",
        // "./node_modules/jquery.maskedinput/src/jquery.maskedinput.js",
        // "./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js",
        // './node_modules/jquery.marquee/jquery.marquee.min.js',
        // "./node_modules/parallax-js/dist/parallax.min.js",
        // "./node_modules/simple-parallax-js/dist/simpleParallax.js",
        "./app/js/**/*.js",
    ],
    stylesProdDir = "./build/css/",
    scriptsProdDir = "./build/js/";

gulp.task("browser-sync", function (done) {
    browserSync.init({
        server: {
            baseDir: "./build/",
            // directory: true,
            index: "index.html",
        },
        notify: false,
    });

    browserSync.watch("./build/**.html").on("change", browserSync.reload);

    done();
});

gulp.task("sass", function (done) {
    return gulp
        .src(stylesAll)
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 versions'],
        }))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest(stylesProdDir))
        .pipe(browserSync.reload({ stream: true }));

    done();
});

gulp.task("js", function (done) {
    return gulp
        .src(scriptsAll)
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest(scriptsProdDir))
        .pipe(browserSync.reload({ stream: true }));

    done();
});

gulp.task("html", function (done) {
    return gulp
        .src('./app/twig/pages/*.twig')
        .pipe(twig())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({ stream: true }));

    done();
});

gulp.task("bootstrap", function (done) {
    return gulp
        .src(['./app/bootstrap/**/*.sass', './app/bootstrap/**/*.scss'])
        .pipe(sass())
        .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest(stylesProdDir))
        .pipe(browserSync.reload({ stream: true }));

    done();
});

gulp.task(
    "watch",
    gulp.series("html", "sass", "js", "browser-sync", function (done) {
        gulp.watch(
            [
                "./app/sass/**/*.sass",
            ],
            gulp.series("sass")
        );

        gulp.watch(
            [
                "./app/twig/**/*.twig",
            ],
            gulp.series("html")
        );

        gulp.watch(
            [
                "./app/js/**/*.js",
            ],
            gulp.series("js")
        );

        done();
    })
);
