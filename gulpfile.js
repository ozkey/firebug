'use strict';

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    watch = require('gulp-watch'),
    sass = require('gulp-ruby-sass'),
    del = require('del'),
    node;

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require("fs");
var transform = require('vinyl-transform');

gulp.task('cleanPolymer', function(cb) {
    del(['public/assets/polymer-elements/**/*'], cb);
});

gulp.task('cleanScripts', function(cb) {
    del(['public/js/**/*'], cb);
    del(['jsGenTests/**/*'], cb);
});



gulp.task('polymerStyles',['cleanPolymer'], function() {
  return sass('./elements-src/', { style: 'expanded' })
      .pipe(gulp.dest('./public/assets/css/polymer-elements'));
});


gulp.task('polymer',['polymerStyles'], function() {
    return gulp.src('elements-src/**/*.html')
        .pipe(fileinclude({basepath: './public/assets/css/polymer-elements/' , prefix: '\\/\\*',  suffix: '\\*\\/' }))
        .pipe(gulp.dest('public/assets/polymer-elements/'));
});


gulp.task('watch_task', ['build'], function() {
    gulp.watch('elements-src/**/*', ['polymer']);
    gulp.watch('js/**/*', ['scripts']);

});


// babelify browserify
gulp.task('scripts', function() {
     browserify("js/src/app.jsx")
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(fs.createWriteStream("public/js/build/app.js"));
});



/* ==================================================== */
/* testing */
/* ==================================================== */

//
var karma = require('karma').server;
gulp.task('test',['scripts'], function () {
    karma.start({
        configFile:__dirname +  '/karma.conf.js',
        singleRun: false
    }, function (exitCode) {
        process.exit(exitCode);
    });

});

/* ==================================================== */
// clean up if an error goes unhandled.
/* ==================================================== */



process.on('exit', function() {

    console.log('\u0007');console.log('\u0007');console.log('\u0007');console.log('\u0007');
    console.log('fix error and run again');

});



/* ==================================================== */
/* Data base */
/* ==================================================== */



var exec = require('child_process').exec;

function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
}





/* ==================================================== */
/* Data base */
/* ==================================================== */


//Running mongo examples
//http://stackoverflow.com/a/28048696/46810
gulp.task('start-mongo', runCommand('C:/MongoDB/Server/3.2/bin/mongod --dbpath C:/MongoDBdata/'));
// gulp.task('start-mongo', runCommand('mongod --dbpath ./data/'));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));
gulp.task('start-app', runCommand('node app.js'));




gulp.task('build', ['polymer','scripts', 'cleanPolymer' ]);
gulp.task('default', ['build', 'test' , 'watch_task']);

