const   {src, dest, parallel, series}  = require('gulp'), 
        imageMin     = require('gulp-imagemin'),
        cssnano      = require('gulp-cssnano'),
        htmlMin      = require('gulp-htmlmin'),
        postcss      = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        terser       = require('gulp-terser'),
        del          = require('del');

const   baseDir     = './app',
        distDir     = './dist',
        htmlFiles   = baseDir + '/*.html',
        imgFiles    = baseDir + '/images/*',
        cssFiles    = baseDir + '/styles/*.css',
        jsFiles     = baseDir + '/scripts/*.js';

function startClean(){
    return del('./dist');
};

function minifyHtml(){
    return src(htmlFiles)
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(distDir));
};

function optimizeImages(){
    return src(imgFiles)
        .pipe(imageMin({
            progressive: true,  // jpeg
            interlaced: true,   // gif
            multipass: true     // svg
        }))
        .pipe(dest(distDir + '/images'));
};

function cssBuild(){
    return src(cssFiles)
        .pipe(postcss([autoprefixer]))
        .pipe(cssnano())    
        .pipe(dest(distDir + '/styles'))
};


function jsBuild() {
    return src(jsFiles)
    .pipe(terser())
    .pipe(dest(distDir + '/scripts'))
}
exports.build = series(startClean, parallel(cssBuild, minifyHtml, optimizeImages, jsBuild));