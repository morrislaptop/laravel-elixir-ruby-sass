var gulp = require('gulp');
var elixir = require('laravel-elixir');
var compile = require('./commands/CompileCSS');
var _ = require('underscore');

var inProduction = elixir.config.production

elixir.extend('rubySass', function(src, output, options) {

    options = _.extend({
        outputStyle: inProduction ? 'compressed' : 'nested',
        includePaths: [elixir.config.bowerDir + "/bootstrap-sass-official/assets/stylesheets"]
    }, options);

    return compile({
        compiler: 'RubySass',
        pluginName: 'ruby-sass',
        pluginOptions: options,
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });

});
