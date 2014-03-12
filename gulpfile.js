var gulp         = require('gulp');
var util         = require('gulp-util');
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var gulpif       = require('gulp-if');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch        = require('gulp-watch');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var react        = require('gulp-react');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var bower        = require('gulp-bower');
var clean        = require('gulp-clean');
var nodemon      = require('gulp-nodemon');
var lr           = require('tiny-lr');
var server       = lr();

// Environment
var prod = util.env.production;
var consoleEnv = prod ? 'Production' : 'Development';
util.log('ENV: ', util.colors.blue(consoleEnv));

// Places things are
var paths = {
  js: 'app/**/*.js',
  jsx: ['app/**/*.jsx', 'app/views/**/*.jsx'],
  styles: ['bower_components/**/*.css', 'app/assets/styles/*.scss'],
  build: 'build/modules'
};

gulp.task('compile-js', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.build))
});

gulp.task('compile-jsx', function() {
  return gulp.src(paths.jsx)
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest(paths.build))
});

gulp.task('scripts', ['compile-js', 'compile-jsx'], function() {
  return gulp.src(paths.build + '/app.js')
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: false,
      debug: !prod,
      expose: './app'
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(prod, uglify({
      mangle: { except: ['require', 'export', '$super'] } })))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload(server));
});

gulp.task('clean-styles', function () {
  return gulp.src(['build/css/app.css'], {read: false})
    .pipe(clean());
});

gulp.task('compile-bower', function() {
  return gulp.src(paths.styles[0])
    .pipe(flatten())
    .pipe(gulp.dest('build/css/1_bower'));
});

gulp.task('compile-sass', function() {
  return gulp.src(paths.styles[1])
    .pipe(plumber())
    .pipe(flatten())
    .pipe(sass({outputStyle: prod ? 'compressed' : 'expanded'}))
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('build/css/2_app'));
});

gulp.task('styles', ['clean-styles', 'compile-bower', 'compile-sass'], function() {
  return gulp.src('build/css/**/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(livereload(server));
});

gulp.task('watch', function() {
  gulp.watch([paths.js, paths.jsx], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('lr-server', function(cb) {
  server.listen(35729, cb);
});

gulp.task("webpack", function(callback) {
  // run webpack
  webpack({
    // configuration
  }, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('default', [
  // 'nodemon',
  'lr-server',
  'scripts',
  'styles',
  'watch'
]);

// .pipe(jshint('.jshintrc'))
// .pipe(jshint.reporter('default'))