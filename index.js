var elixir       = require('laravel-elixir'),
	gulp         = require('gulp'),
	rubySass     = require('gulp-ruby-sass'),

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
