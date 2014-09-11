var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var git = require('gulp-git');
var preprocess = require('gulp-preprocess');
var stripDebug = require('gulp-strip-debug');
//var minifyCss = require('gulp-minify-css');
//var sass = require('gulp-sass');
//var bower = require('bower');
//var rename = require('gulp-rename');
//var sh = require('shelljs');

//http://jbavari.github.io/blog/2014/08/23/managing-environment-variables-for-your-ionic-application/


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['test']);

gulp.task('test', function() {
    gutil.log('Azione di default DEFAULT');
    gutil.log('Per comprimere i files usare : ', gutil.colors.cyan('gulp compress'));
});


gulp.task('compress', function() {
  gulp.src('www/js/*.js')
    .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('www/js-min'));
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('git', function(){
   gulp.src('./*')
    .pipe(git.add())
    //.pipe(git.commit('DEMO'))
    //.pipe(git.push('origin', 'master', function (err) { if (err) throw err; }))
});


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
