/*
 * Assemble Plugin: Permalinks
 * https://github.com/assemble/permalinks
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._;

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      all: ['Gruntfile.js', 'sitemap.js']
    },

    assemble: {
      options: {
        plugins: ['./sitemap.js']
      },
      // Should modify dest path using preset "pretty"
      sitemap: {
        files: [
          {
            expand: true, 
            cwd: 'test/fixtures/pages', 
            src: ['**/*.hbs'], 
            dest: 'test/actual/sitemap'
          }
        ]
      },
      sitemap_option: {
        options: {
          sitemap: {
            homepage: 'http://assemble.io',
            changefreq: 'daily',
            priority: '0.5'
          }
        },
        files: [
          {
            expand: true, 
            cwd: 'test/fixtures/pages', 
            src: ['**/*.hbs'], 
            dest: 'test/actual/sitemap_option'
          }
        ]
      }
    },

    // Before generating new files, remove any files from previous build.
    clean: {
      actual: ['test/actual/**'],
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('assemble');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble', 'readme']);
};