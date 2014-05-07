module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc' // Grab options from JSHint file
			},
			src: ['src/**/*.js'],
			specs: ['specs/**/*.js']
		},
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			continuous: {
				singleRun: true,
				browsers: ['PhantomJS']
			}, develop: {

			}

		},
		watch: {
			options: {
				spawn: false
			},
			all: {
				files: ['src/**/*.js', 'specs/**/*.js'],
				tasks: ['build', 'karma:develop:run']
			}
		},
		'browserify': {
			options: {
				debug: true
			},
			vendor: {

				src: [],
				dest: 'build/each-async.js',
				options: {
					alias: ['./node_modules/each-async/each-async.js:each-async']
				}
			},

			client: {
				options: {
					alias: ['./src/async-template.js:async-template'],
					external: ['each-async']
				},
				src: [],
				dest: 'build/async-template.js'
			}

		},
		uglify: {
			build: {
				files: {
					'build/async-template.min.js': ['src/async-template.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build', ['jshint', 'browserify']);
	grunt.registerTask('ci', ['build', 'karma:continuous']);
	grunt.registerTask('develop', ['build', 'karma:develop:run', 'watch:all']);
	grunt.registerTask('test-server', ['karma:develop:start']);

};