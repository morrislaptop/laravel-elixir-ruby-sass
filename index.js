var elixir       = require('laravel-elixir'),
	gulp         = require('gulp'),
	rubySass     = require('gulp-ruby-sass'),
	gulpif       = require('gulp-if'),
	autoprefixer = require('gulp-autoprefixer'),
	minify       = require('gulp-minify-css'),
	Notification = require('laravel-elixir/ingredients/helpers/Notification'),
	utilities    = require('laravel-elixir/ingredients/helpers/Utilities'),
	config       = require('laravel-elixir').config,
	_            = require('underscore');;

elixir.extend('rubySass', function(src, output, options) {

	var config = this;
	var baseDir = config.assetsDir + 'sass';
	src = utilities.buildGulpSrc(src, baseDir, '**/*.+(sass|scss)');

	options = _.extend({
		"sourcemap=none": true,
		loadPath: [config.bowerDir, config.bowerDir + "/bootstrap-sass-official/assets/stylesheets"]
	}, options);

	gulp.task('rubySass', function() {
		var onError = function(err) {
			new Notification().error(err, 'Sass Compilation Failed!');
			this.emit('end');
		};

		return gulp.src(src)
			.pipe(rubySass(options)).on('error', onError)
			.pipe(autoprefixer())
			.pipe(gulpif(config.production, minify()))
			.pipe(gulp.dest(output || config.cssOutput));
	});

	this.registerWatcher('rubySass', baseDir + '/**/*.+(sass|scss)');
	return this.queueTask('rubySass');

});
