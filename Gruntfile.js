module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Copia los archivos
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'public/components/bootstrap-sass/assets/javascripts/',
                        src: ['**/bootstrap.min.js'],
                        dest: 'public/javascripts/'
                    },
                    {
                        expand: true,
                        cwd: 'public/components/jquery/dist/',
                        src: ['**/jquery.min.js', '**/jquery.min.map'],
                        dest: 'public/javascripts/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'public/components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'public/fonts/'
                    }
                ]
            },
        },


        // Compila SASS a CSS minificado
        sass: {
            options: {
                includePaths: ['public/components/bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'public/stylesheets/style.css': 'public/components/style.scss'
                }
            }
        },

        // Observa los cambios en archivos
        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: [
                    'public/stylesheets/style.scss'
                ],
                tasks: ['sass']
            }
        }
    });

    // Carga las tareas
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Establece el nombre de las tareas
    grunt.registerTask('build', ['sass', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);
}