module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        directory: {
            app: 'app',
            dist: 'dist'
        },

        watch: {
            css: {
                files: [
                    '<%= directory.app %>/css/modules/*.scss',
                    '<%= directory.app %>/css/*.scss',
                    '<%= directory.app %>/css/*.css'
                ],
                tasks: ['sass', 'copy:styles'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            includeTpl: {
                files: ['<%= directory.app %>/*.html', '<%= directory.app %>/**/*.html'],
                tasks: ['includereplace'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            configFiles: {
                files: [ 'Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        includereplace: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        src: [
                            '<%= directory.app %>/*.html',
                            '!<%= directory.app %>/templates/*.html'
                        ],
                        dest: '<%= directory.dist %>/pages',
                        flatten: true
                    }
                ]
            }
        },

        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            '<%= directory.app %>/css/*.scss',
                            '!<%= directory.app %>/css/mixins.scss'
                        ],
                        dest: '<%= directory.dist %>/css/',
                        ext: '.css',
                        flatten: true
                    }
                ]
            }
        },

        copy: {
            styles: {
                expand: true,
                src: ['<%= directory.app %>/css/*.css'],
                dest: '<%= directory.dist %>/css/',
                flatten: true,
                filter: 'isFile'
            }
        }
    });

    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['includereplace', 'sass', 'copy']);
    grunt.registerTask('watchfiles', ['watch']);
};