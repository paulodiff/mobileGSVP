/*******************************************************************************
1. DEPENDENCIES
*******************************************************************************/
 
var gulp = require('gulp'),                             // gulp core
    sass = require('gulp-sass'),                        // sass compiler
    uglify = require('gulp-uglify'),                    // uglifies the js
    jshint = require('gulp-jshint'),                    // check if js is ok
    rename = require("gulp-rename");                    // rename files
    concat = require('gulp-concat'),                    // concatinate js
    notify = require('gulp-notify'),                    // send notifications to osx
    plumber = require('gulp-plumber'),                  // disable interuption
    stylish = require('jshint-stylish'),                // make errors look good in shell
    minifycss = require('gulp-minify-css'),             // minify the css files
    browserSync = require('browser-sync'),              // inject code to all devices
    autoprefixer = require('gulp-autoprefixer'),        // sets missing browserprefixes
    gutil = require('gulp-util'),
    preprocess = require('gulp-preprocess'),
    stripDebug = require('gulp-strip-debug'),
    inject = require('gulp-inject'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean'),
    ngHtml2Js = require("gulp-ng-html2js");
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var imagepreload = require('gulp-image-preload');
var del = require('del');
    

var mymd5 = new Date().getTime(); 
 
 
/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/
 
var target = {
    sass_src : 'scss/**/*.scss',                        // all sass files
    css_dest : 'css',                                   // where to put minified css
    js_lint_src : [                                     // all js that should be linted
        'js/build/app.js',
        'www/js/*',
        'js/build/custom/switch.js',
        'js/build/custom/scheme-loader.js'
    ],
    js_uglify_src : [                                   // all js files that should not be concatinated
        'js/build/custom/scheme-loader.js',
        'js/build/vendor/modernizr.js'
    ],
    js_concat_src : [                                   // all js files that should be concatinated
        'js/build/custom/switch.js',
        'js/build/app.js'
    ],
    js_dest : 'js'                                      // where to put minified js
};
 
 
/*******************************************************************************
3. SASS TASK
*******************************************************************************/
 
gulp.task('sass', function() {
    gulp.src(target.sass_src)                           // get the files
        .pipe(plumber())                                // make sure gulp keeps running on errors
        .pipe(sass())                                   // compile all sass
        .pipe(autoprefixer(                             // complete css with correct vendor prefixes
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        .pipe(minifyCss())                              // minify css
        .pipe(gulp.dest(target.css_dest))               // where to put the file
        .pipe(notify({message: 'SCSS processed!'}));    // notify when done
});
 
 
/*******************************************************************************
4. JS TASKS
*******************************************************************************/
 
// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_lint_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});
 
// minify all js files that should not be concatinated
gulp.task('js-uglify', function() {
    gulp.src(target.js_uglify_src)                      // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(rename(function(dir,base,ext){            // give the files a min suffix
            var trunc = base.split('.')[0];
            return trunc + '.min' + ext;
        }))
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({ message: 'JS processed!'}));     // notify when done
});
 
// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(target.js_concat_src)                      // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(concat('scripts.min.js'))                 // concatinate to one file
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({message: 'JS processed!'}));      // notify when done
});
 
 
/*******************************************************************************
5. BROWSER SYNC
*******************************************************************************/
 
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/*.js'], {        // files to inject
        proxy: {
            host: 'localhost',                          // development server
            port: '2368'                                // development server port
        }
    });
});
 

/*******************************************************************************
1. INJECT IN INDEX TEMPLATE HTML
*******************************************************************************/
 



/*******************************************************************************
1. GULP TASKS
*******************************************************************************/

gulp.task('default', ['test']);

gulp.task('test', function() {
    gutil.log('Azione di default DEFAULT');
    gutil.log('Per comprimere i files usare : ', gutil.colors.cyan('gulp compress'));
    gutil.log('Per controllare i files usare : ', gutil.colors.cyan('gulp jslint'));
});


gulp.task('default1', function() {
    gulp.run('sass', 'js-lint', 'js-uglify', 'js-concat', 'browser-sync');
    gulp.watch('scss/**/*.scss', function() {
        gulp.run('sass');
    });
    gulp.watch(target.js_lint_src, function() {
        gulp.run('js-lint');
    });
    gulp.watch(target.js_minify_src, function() {
        gulp.run('js-uglify');
    });
    gulp.watch(target.js_concat_src, function() {
        gulp.run('js-concat');
    });
});






//var minifyCss = require('gulp-minify-css');
//var sass = require('gulp-sass');
//var bower = require('bower');
//var rename = require('gulp-rename');
//var sh = require('shelljs');

//http://jbavari.github.io/blog/2014/08/23/managing-environment-variables-for-your-ionic-application/


gulp.task('dist', ['clean:dist','vendor','css','template','compress', 'index'] );

gulp.task('htmlmin', function() {
   var htmlSrc = 'www/partials/*.html',
   htmlDst = 'dist/partials';
   var opts = {empty: true};

   gulp.src(htmlSrc)
      //.pipe(changed(htmlDst))
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest(htmlDst));
});

// CLEAN DIST
gulp.task('clean:dist', function (cb) {
  del([
    'dist/js/**',
    'dist/partials/**',
    'dist/css/**'
    // here we use a globbing pattern to match everything inside the `mobile` folder
    //'dist/css/**',
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});


gulp.task('template', function() {
    gulp.src("www/partials/*.html")
    .pipe(minifyHTML({
            empty: true,
            spare: true,
            quotes: true}
                    ))
    .pipe(ngHtml2Js({
        moduleName: "MyApp" ,  
        prefix: "partials/"
    }))
    .pipe(concat("partials-"+ mymd5 +".js"))
    //.pipe(uglify())
    .pipe(gulp.dest("dist/partials"));
});

// BUILD INDEX WITH NEW MD5

gulp.task('index', function () {
    
  var tagJsApp = '<script src="js/app-' + mymd5 +'.js" type="text/javascript"></script>';    
  var tagCSS = '<link href="css/style-' + mymd5 + '.css" rel="stylesheet">';    
  var tagJsPartials = '<script src="partials/partials-' + mymd5 +'.js" type="text/javascript"></script>';  
    
  gulp.src('www/index.html')
    .pipe(preprocess({context: { 
        NODE_ENV: 'productionold', 
        DEBUG: true, 
        TAG_JS_APP : tagJsApp,
        TAG_JS_PARTIALS : tagJsPartials,
        TAG_CSS : tagCSS
    }}))
    //.pipe(inject(gulp.src(['www/js/*.js', '!./src/importantFile.js'], {read: false}), {relative: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});


// BUILD PRELOAD TEMPLATE FILES

gulp.task('template2', function () {
    gulp.src('www/partials/*.html')
        .pipe(templateCache({ root: "partials/", module: 'myApp' }))
        .pipe(rename('templates-'+ mymd5 +'.js'))
        .pipe(gulp.dest('dist/partials'));
    gutil.log('templates-'+ mymd5 +'.js');
});

// VENDOR LIBRARY COPY

gulp.task('vendor', function () {
    gulp.src('www/lib/**')
        .pipe(gulp.dest('dist/lib'));
});

// LINT CHECK FILES

gulp.task('lint', function() {
  return gulp.src('./www/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

// BUILD APPLICATIONS FILES
// PREPROCESS FOR PRODUCTION (REMOVE AUTOLOGIN/LOCAL IP)
// COMPRESS CONCAT

gulp.task('compress', function() {
  //gulp.src('www/js/*.js')
    
     
  gulp.src([
            'www/js/app.js',
            'www/js/services.js',
            'www/js/rootControllers.js',
            'www/js/loginControllers.js',
            'www/js/serviziControllers.js',
            'www/js/relazioniControllers.js',
            'www/js/rapportiControllers.js',
            'www/js/filters.js',
            'www/js/directives.js'
  ])
    .pipe(concat('app-'+ mymd5 +'.js'))
    .pipe(stripDebug())
    .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
    //Strip console, alert, and debugger statements from JavaScript code with strip-debug
    .pipe(uglify({mangle:false, preserveComments: "some"}))
    //.pipe(gutil.log('file :', gutil.colors.cyan('app-'+ mymd5 +'.js')))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('imagepreload', function () {
  gulp.src('www/img/*.{png,jpg,gif,jpeg}')
    .pipe(imagepreload({
        inline: "dist/index1.html",
        script: "preloadimages.js",
        md5: mymd5 //,        scriptPath: "dist/js/"
    }))
    .pipe(gulp.dest('dist/js/'));
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

gulp.task('css', function() {
  gulp.src('www/css/*.css')
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(rename('style-' + mymd5 +'.css'))
    .pipe(gulp.dest('./dist/css/'))
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
