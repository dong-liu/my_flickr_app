// Karma configuration
// Generated on Sat Aug 10 2013 13:05:21 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine', 'mocha', 'requirejs'],

	hostname: 'localhost',
	
    // list of files / patterns to load in the browser
    files: [
        {pattern: 'public/js/libs/**/*.js', included: false},
        {pattern: 'public/js/flickr/**/*.js', included: false},
        {pattern: 'public/js/flickr/**/*.html', watched: true, included: false, served: true},
        {pattern: 'public/js/test/**/*Spec.js', included: false},
        // Make karma work for fixtures
        {pattern: 'public/js/test/fixtures/*.*', watched: true, included: false, served: true},
        'public/js/test/test-main.js'
    ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'junit'],
    
    // will be resolved to basePath (in the same way as files/exclude patterns)	
	junitReporter: {outputFile: 'test-results.xml'},

    // web server port
    port: 3000,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    
    // List of plugins to load
    plugins: ['karma-jasmine','karma-chrome-launcher', 'karma-requirejs', 'karma-mocha', 'karma-junit-reporter']
	
  });
};
