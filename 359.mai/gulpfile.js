//导入模块
const {src,dest,watch} = require('gulp'),
      cssnano = require('gulp-cssnano'),
      sass = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat');

//发布任务
function fnCss(){
    return src('./src/sass/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(dest('./dist/css'));
}

function fnJS(){
    return src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(dest('./dist/js'));
}

function fnLib(){
    return src('./src/lib/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(dest('./dist/lib'));
}

function fnHTML(){
    return src('./src/pages/*.html')
        .pipe(htmlmin())
        .pipe(dest('./dist/pages'));
}

function fnImage(){
    return src('./src/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}

function fnCopyIndex(){
    return src('./src/index.html')
        .pipe(dest('./dist'));
}

function fnWatch(){
    watch('./src/sass/*.scss',fnCss);
    watch('./src/js/*.js',fnJS);
    watch('./src/lib/*.js',fnLib);
    watch('./src/pages/*.html',fnHTML);
    watch('./src/img/*',fnImage);
    watch('./src/index.html',fnCopyIndex);
}

//导出模块
exports.copy = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJS;
exports.lib = fnLib;
exports.html = fnHTML;
exports.img = fnImage;
exports.default = fnWatch;