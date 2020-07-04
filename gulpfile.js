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
        favicons    = baseDir + '/images/favicons/*',
        cssFiles    = baseDir + '/styles/*.css',
        jsFiles     = baseDir + '/scripts/*.js',
        seoFiles    = [baseDir + '/*.txt', baseDir + '/*.xml'];

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

//favicons needs to end up in root dir of server
function copyFavicons(){
    return src(favicons)
        .pipe(dest(distDir));
};

function copySeoFiles(){
    return src(seoFiles)
        .pipe(dest(distDir));
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
//since Parcel is added to the project, the build task in now obsolete
exports.build = series(
    startClean, 
    parallel(
        copyFavicons,
        copySeoFiles,
        cssBuild, 
        minifyHtml, 
        optimizeImages, 
        jsBuild
    )
);