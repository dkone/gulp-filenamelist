var path = require('path'),
    File = require('gulp-util').File,
    PluginError = require('gulp-util').PluginError,
    PLUGIN_NAME = 'gulp-filenamelist';

module.exports = {
    verifyOptions: function(options) {
        options = options || {};
        options.outputFileName = options.outputFileName || 'filenamelist.csv';
        options.separator = options.separator || ',';
        options.prepend = options.prepend || '';
        options.append = options.append || '';
        options.quotesSingle = options.quotesSingle || false;
        options.quotesDouble = options.quotesDouble || false;

        if (options.quotesSingle && options.quotesDouble) {
            throw new PluginError(
                PLUGIN_NAME,
                'Cannot have both single and double quotes.'
            );
        }
        return options;
    },
    surroundWithQuotes: function(quote, list) {
       return list.map(function(item) {
                return quote + item + quote;
        });
    },
    createFile: function(options, contents) {
        return new File({
            cwd: __dirname,
            base: __dirname,
            path: path.join(__dirname, options.outputFileName),
            contents: new Buffer(contents)
        });
    }
};