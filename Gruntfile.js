const sass = require('node-sass');

module.exports = function(grunt){
  grunt.initConfig({
    sass: {
      options: {
        style: 'compressed',
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'assets/css/style.min.css': ['assets/scss/style.scss']
        }
      }
    },
    cssmin: {
      sitecss: {
        options: {
          banner: '/* My minified plugin css file */',
          sourceMap: true
        },
        files: {
          'assets/css/plugin.min.css': [
              'assets/css/plugins/owl.carousel.min.css',
              'assets/css/plugins/select2.min.css'
            ]
        }
      }
    },
    uglify: {
      options: {
          compress: true,
          sourceMap: true
      },
      build: {
        files: {
          'assets/js/app.min.js': ['assets/js/app.js'],
          'assets/js/plugin.min.js': [ 'assets/js/plugins/jquery.min.js','assets/js/plugins/bootstrap.min.js', 'assets/js/plugins/owl.carousel.js', 'assets/js/plugins/select2.min.js', 'assets/js/plugins/isotope.pkgd.min.js']
        }
      }
    },
    codekit: {
      files: {
        src: ['assets/kit/**/*.kit'],
        dest: ''
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          open:true,
          base: '',
          hostname: '0.0.0.0',
          protocol: 'http',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      cssmin: {
        files: ['css/**/*'],
        tasks: ['cssmin'],
        options: { livereload: true },
      },
      scss: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true },
      },
      uglify: {
        files: ['assets/js/**/*'],
        tasks: ['uglify'],
        options: { livereload: true },
      },
      codekit: {
        files: ['assets/kit/**/*'],
        tasks: ['codekit'],
        options: { livereload: true },
      },
      copy: {
        files: {
          cwd: 'assets/css',  // set working folder / root to copy
          src: '**/*',           // copy all files and subfolders
          dest: 'wp-content/themes/FEtask1/assets/css',    // destination folder
          expand: true           // required when using cwd
        }
      }
  }
});

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect','watch']);
  require('load-grunt-tasks')(grunt);
}
