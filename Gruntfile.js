/*global module:false*/
module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({

    publicJsDir: 'public/js',
    publicCssDir: 'public/css',
    publicScssDir: 'public/scss',
    publicImgDir: 'public/img',
    buildDir: 'public/js/dist',

    min: {
      build: {
        src: '<%= buildDir %>/js/main.js',
        dest: '<%= buildDir %>/js/main.js'
      }
    },

    uglify: {
      mangle: {toplevel: true},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true}
    },

    concat: {
      css: {
        src: ['<%= publicJsDir %>/libs/bootstrap.css/css/bootstrap.min.css', '<%= publicCssDir %>/*.css'],
        dest: '<%= buildDir %>/css/main.css'
      }
    },

    requirejs: {
      production: {
        options: {
          baseUrl: "<%= publicJsDir %>/",
          mainConfigFile: "<%= publicJsDir %>/main.js",
          out: "<%= buildDir %>/js/main.js",
          name:'main'
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: '<%= publicScssDir %>',
          cssDir: '<%= publicCssDir %>',
          imagesDir: '<%= publicImgDir %>',
          relativeAssets: true
        }
      },
      prod: {
        options: {
          sassDir: '<%= publicScssDir %>',
          cssDir: '<%= publicCssDir %>',
          imagesDir: '<%= publicImgDir %>',
          relativeAssets: true,
          environment: 'production'
        }
      }
    },

    watch: {
      compass: {
        files: ['<%= publicScssDir %>/**/*.{scss,sass}'],
        tasks: ['compass']
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: '<%= publicImgDir %>/', src: ['**'], dest: '<%= buildDir %>/img/'},
          {expand: true, cwd: '<%= publicJsDir %>/libs/bootstrap.css/img/', src: ['**'], dest: '<%= buildDir %>/img/'}
        ]
      },
    }

  });

  // Tasks loading
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tasks registration
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['requirejs', 'compass:prod', 'concat:css', 'copy']);

};
