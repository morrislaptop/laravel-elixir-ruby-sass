var gulp = require('gulp');
var elixir = require('laravel-elixir');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');
var _ = require('underscore');

var inProduction = elixir.config.production;

elixir.extend('rubySass', function(src, output) {

    var pluginName = 'rubySass';
    var search = '**/*.+(sass)';


    gulp.task(pluginName, function () {

        var gulpSrc = utilities.buildGulpSrc(
            src, config.assetsDir + 'sass', search
        );

        return gulp.src(gulpSrc)
            .pipe(plugins.rubySass({
                style: inProduction ? 'compressed' : 'nested',
                loadPath: [elixir.config.bowerDir + "/bootstrap-sass-official/assets/stylesheets"]
            }))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(gulp.dest(output))
            .pipe(new Notification().message('Ruby Sass Compiled!'));
    });

    config.registerWatcher(
        pluginName,
        config.assetsDir + pluginName + '/' + search
    );

    return config.queueTask('rubySass');

});
