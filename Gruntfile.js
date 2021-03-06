'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-bake');

  grunt.initConfig({
    dirs: {
      handlebars: 'assets/hbs',
    },

    watch: {
      compass: {
        files: 'sass/**/*.scss',
        tasks: ['compass', 'replace']
      },

      scripts: {
        files: [
          'assets/js/components/*.js',
          'assets/js/framework/*.js',
          'assets/js/lib/*.js'
        ],
        tasks: ['build']
      },

      bake: {
        files: ['templates/**/*.html'],
        tasks: 'bake:build'
      },

      handlebars: {
        files: ['<%= handlebars.compile.src %>'],
        tasks: ['handlebars:compile', 'concat', 'uglify']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: [
        'Gruntfile.js',
        'assets/js/components/*.js'
      ]
    },

    concat: {
      components: {
        src: ['assets/js/components/*.js',
              'assets/js/templates.js'],
        dest: 'assets/js/components.js'
      },
      framework: {
        src: ['assets/js/framework/*.js'],
        dest: 'assets/js/framework.js'
      },
      library: {
        src: ['assets/js/lib/single/jquery-2.1.1.js',
              'assets/js/lib/single/jquery.tooltipster.min.js',
              'assets/js/lib/*.js'],
        dest: 'assets/js/lib.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'assets/js/components.min.js': 'assets/js/components.js',
          'assets/js/framework.min.js': 'assets/js/framework.js',
          'assets/js/lib.min.js': 'assets/js/lib.js'
        }
      }
    },

    bake: {
      build: {
        files: {
            'index.html': 'templates/structure/index.html'
        }
      }
    },

    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    replace: {
      example: {
        src: ['assets/css/*.css'],
        overwrite: true,
        replacements: [{
          from: '/assets/img',
          to: '../../assets/img'
        }]
      }
    },

    handlebars: {
      compile: {
        src: '<%= dirs.handlebars %>/*.hbs',
        dest: 'assets/js/templates.js',
        options: {
          namespace: 'Rhapsody.Templates',
          processName: function(filePath) {
            return filePath.replace(/^assets\/hbs\//, '').replace(/\.hbs$/, '');
          }
        }
      }
    }
  });

  grunt.registerTask('build', ['compass:clean', 'compass:dist', 'jshint', 'handlebars', 'concat', 'uglify', 'bake:build', 'replace']);
  grunt.registerTask('default', ['build']);
};
