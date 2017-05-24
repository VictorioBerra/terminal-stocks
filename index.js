var nconf = require('nconf');
var path = require("path");
var AppDirectory = require('terminalstocks')
var dirs = new AppDirectory('mycoolappname')

nconf.argv()
    .env()
    .file({
        file: path.join(AppDirectory, 'config.json')
    });

