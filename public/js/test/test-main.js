var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/public/js',

    paths : {
        jquery: 'libs/jquery/jquery.min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/requirejs-text/text',
        url: 'url',
        handlebars: 'libs/handlebars/handlebars',
        moment: 'libs/moment/min/moment.min',
        jasminejQuery: 'libs/jasmine-jquery/lib/jasmine-jquery'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        moment: {
            exports: 'moment'
        },
        jasminejQuery: {
            deps: ['jquery'],
            exports: 'jasmine'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});