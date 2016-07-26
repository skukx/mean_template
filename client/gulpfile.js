var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var inject = require('gulp-inject');
var rsync = require('gulp-rsync');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var inlineImagePath = require('gulp-inline-image-path');
var ngConfig = require('gulp-ng-config');
var paths = require('./gulpconfig.json');

gulp.task('default', ['build'], function() {

});

gulp.task('deploy', function() {
  // gulp.src(paths.build + '/**')
  //   .pipe(rsync({
  //     root: paths.build,
  //     hostname: 'epub-search.deseretbook.net',
  //     username: 'ubuntu',
  //     destination: './angular-client'
  //   }));
});

gulp.task('build', ['inject'], function() {

});

gulp.task('prod', ['build'], function() {

});

gulp.task('dev', ['dev-ngconfig'], function() {

});

gulp.task('ngconfig', function() {
  generateNgConfig('production', paths.build + '/assets/js/');
});

gulp.task('dev-ngconfig', function() {
  generateNgConfig('local', './app/core/');
});

function generateNgConfig(env, dest) {
  gulp.src('./ngconfig.json')
    .pipe(ngConfig('app.core', {
      createModule: false,
      environment: env
    }))
    .pipe(gulp.dest(dest));
}

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.build, { force: true });
});

var buildTasks = [
  'vendorjs',
  'vendorcss',
  'js',
  'css',
  'images'
]
gulp.task('inject', buildTasks, function() {
  var vendors = gulp.src([
    paths.build + '/assets/js/vendor.min.js',
    paths.build + '/assets/css/vendor.min.css'
  ], { read: false });

  var all = gulp.src([
    paths.build + '/assets/js/all.min.js',
    paths.build + '/assets/css/all.min.css'
  ], { read: false });

  return gulp.src('./index.html')
    .pipe(inject(vendors, { name: 'inject-vendor', ignorePath: '../server/dist/', relative: true }))
    .pipe(inject(all, { ignorePath: '../server/dist/', relative: true }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('templatecache', function() {
  return gulp.src(paths.htmltemplates)
    .pipe(templateCache('templates.js', {
      module: 'app.core',
      root: 'app/'
    }))
    .pipe(gulp.dest(paths.build + '/assets/js'));
});

gulp.task('vendorjs', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.vendorjs)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js'));
});

gulp.task('js', ['templatecache', 'ngconfig'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  console.log(paths.js);
  var sources = [].concat(paths.js, paths.build + '/assets/js/templates.js',
    paths.build + '/assets/js/ngconfig.js');
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js'));
});

gulp.task('vendorcss', function() {
  return gulp.src(paths.vendorcss)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/css'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('all.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/css'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.build + '/assets/img'));
});
