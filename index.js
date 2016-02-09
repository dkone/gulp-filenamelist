var through = require('through2'),
    gutil = require('gulp-util'),
    path = require('path'),
    File = gutil.File;

module.exports = function() {
    var nameList = [],
        fileName = 'filenamelist.txt';

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
            path: path.join(__dirname, fileName),
            contents: new Buffer(nameList.toString())
        });

        this.push(nameFile);
        callback();
    }

    return through.obj(addFileToNameList, createNameFile);
};
