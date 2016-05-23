// Karma configuration
// Generated on Thu Aug 06 2015 12:41:15 GMT+1000 (AUS Eastern Standard Time)

var istanbul = require("browserify-istanbul");
var NODE_ENV = "testing";

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify','jasmine'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'js/vendor/jquery-1.12.4.min.js', watched: false, served: true, included: true},
            {pattern: 'js/vendor/jasmine-jquery.js', watched: false, served: true, included: true},
                     

            {pattern: 'js/test/**/*.js', included: true}
            //'test-main.js',
            //{pattern: '/js/test/*.js', included: false},
            //{pattern: 'js/test/*.js', included: false}
        ],


        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/test/**/*.js': ['browserify'],
            'js/src/**/*.js*':  ['coverage']

        },


        browserify: {
            debug: true,
            insertGlobals : false,
            transform: [  'reactify','browserify-istanbul'],
            //bundleDelay: 1000,  // WAR for karma-browserify race condition

            //transform: [
            //    [
            //        istanbul({
            //            ignore: ["node_modules/**", "**/*.spec.js"],
            //            includeUntested: false,
            //            defaultIgnore: true
            //        }),
            //        { global: true }
            //    ]
            //]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','coverage'],


        // web server port
        port: 9876,

        coverageReporter: {
            reporters : [
                {"type": "text"},
                {type: 'html', subdir: 'coverage'},

            ]
        },


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        plugins : [
            'karma-babel-preprocessor',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-browserify'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
