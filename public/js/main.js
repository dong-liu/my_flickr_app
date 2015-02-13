require.config({
  
    baseUrl:'js/',
  
    paths : {
        jquery: 'libs/jquery/jquery.min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/requirejs-text/text',
        handlebars: 'libs/handlebars/handlebars',
        moment: 'libs/moment/min/moment.min'
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
        }
    },

    deps: ['./bootstrap']
  
});