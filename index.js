var elixir       = require('laravel-elixir'),
	gulp         = require('gulp'),
	rubySass     = require('gulp-ruby-sass'),
	gulpif       = require('gulp-if'),
	autoprefixer = require('gulp-autoprefixer'),
	minify       = require('gulp-minify-css'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify');

elixir.extend('rubySass', function(src, output) {

	var config = this;
	var baseDir = config.assetsDir + 'sass';
	src = baseDir + '/' + src;
	//src = this.buildGulpSrc(src, baseDir, '**/*.sass');

	gulp.task('rubySass', function() {
		var onError = function(err) {
			notify.onError({
				title:	'Laravel Elixir',
				subtitle: 'Sass Compilation Failed!',
				message:  'Error: <%= error.message %>',
				icon: __dirname + '/../laravel-elixir/icons/fail.png'
			})(err);

			this.emit('end');
		};

		return gulp.src(src)
			.pipe(rubySass({
				"sourcemap=none": true
			})).on('error', onError)
			.pipe(autoprefixer())
			.pipe(gulpif(config.production, minify()))
			.pipe(gulpif(config.production, rename({suffix: '.min'})))
			.pipe(gulp.dest(output || config.cssOutput))
			.pipe(notify({
				title: 'Laravel Elixir',
				subtitle: 'Stylus Compiled!',
				icon: __dirname + '/../laravel-elixir/icons/laravel.png',
				message: ' '
			}));
	});

	this.registerWatcher('rubySass', baseDir + '/**/*.sass');
	return this.queueTask('rubySass');

});