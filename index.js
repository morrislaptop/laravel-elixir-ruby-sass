var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var elixir = require('laravel-elixir');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');
var _ = require('underscore');

var inProduction = elixir.config.production;

elixir.extend('rubySass', function(src, output, options) {

    options = _.extend({
        outputStyle: inProduction ? 'compressed' : 'nested',
        includePaths: [elixir.config.bowerDir + "/bootstrap-sass-official/assets/stylesheets"]
    }, options);

    function compile(options) {
        var src = utilities.buildGulpSrc(
            options.src, config.assetsDir + options.pluginName, options.search
        );

        var onError = function(e) {
            new Notification().error(e, options.compiler + ' Compilation Failed!');

            this.emit('end');
        };

        gulp.task(options.pluginName, function() {
            return gulp.src(src)
                .pipe(plugins[options.pluginName](options.pluginOptions)).on('error', onError)
                .pipe(plugins.autoprefixer())
                .pipe(plugins.if(config.production, plugins.minifyCss()))
                .pipe(gulp.dest(options.output || config.cssOutput))
                .pipe(new Notification().message(options.compiler + ' Compiled!'));
        });

        config.registerWatcher(
            options.pluginName,
            config.assetsDir + options.pluginName + '/' + options.search
        );

        return config.queueTask(options.pluginName);
    }

    return compile({
        compiler: 'RubySass',
        pluginName: 'rubySass',
        pluginOptions: options,
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });

});
