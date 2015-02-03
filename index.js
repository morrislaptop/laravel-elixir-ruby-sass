var gulp = require('gulp');
var elixir = require('laravel-elixir');
var plugins = require('gulp-load-plugins')();
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');
var _ = require('underscore');

var inProduction = elixir.config.production;

elixir.extend('rubySass', function(src, output, options) {

    var pluginName = 'rubySass';
    var search = '**/*.+(sass|scss)';

    options = _.extend({
        style: inProduction ? 'compressed' : 'nested'
    }, options);

    gulp.task(pluginName, function () {

        var gulpSrc = utilities.buildGulpSrc(
            src, elixir.config.assetsDir + 'sass', search
        );

        return gulp.src(gulpSrc)
            .pipe(plugins.rubySass(options))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(elixir.config.production, plugins.minifyCss()))
            .pipe(gulp.dest(output))
            .pipe(new Notification().message('Ruby Sass Compiled!'));
    });

    elixir.config.registerWatcher(
        pluginName,
        elixir.config.assetsDir + 'sass' + '/' + search
    );

    return elixir.config.queueTask(pluginName);
});
