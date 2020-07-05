const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        css: {
            options: {
                implementation: sass
            },
            mian: {
                files: {
                    "dist/index.css": "src/**/*.css"
                }
            }
        },
        js: {
            options: {
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    "dist/index.js": "src/**/*.js"
                }
            }
        },
        html: {                                 
            options: {                               
                removeComments: true,
                collapseWhitespace: true
            },
            files: {                                   
                'dist/index.html': 'src/**/*.html',    
            }
        }
    })

    grunt.registerTask('build', ['js', 'css', 'html']);
    
    loadGruntTasks(grunt);
}