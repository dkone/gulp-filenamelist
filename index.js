'use strict';

var through = require('through2'),
    path = require('path'),
    File = require('gulp-util').File;

module.exports = function(options) {
    var nameList = [];

    options = options || {};
    options.fileName = options.fileName || 'filenamelist.txt';

    //noinspection JSUnusedLocalSymbols
    function addFileToNameList(file, encoding, callback) {
        var name = file.path.replace(file.base, '');

        nameList.push(name);
        callback();
    }

    function createNameFile(callback) {
        var nameFile = new File({
            cwd: __dirname,
            base: __dirname,
            path: path.join(__dirname, options.fileName),
            contents: new Buffer(nameList.toString())
        });

        this.push(nameFile);
        callback();
    }

    return through.obj(addFileToNameList, createNameFile);
};
