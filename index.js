var nconf = require('nconf');
var path = require('path');
var AppDirectory = require('appdirectory');
var dirs = new AppDirectory('terminalstocks');
var blessed = require('blessed');

nconf.argv()
    .env()
    .file({
        file: path.join(dirs.userConfig(), 'config.json')
    });

nconf.defaults({
    'stocks': [
        'AAPL'
    ]
});

// Create a screen object.
var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'Terminal Stocks';

blessed.listbar({
    parent: screen,
    tags: true,
    mouse: true,
    top: 0,
    commands: {
        //'{bold}Terminal Stocks{/bold}': () => {},
        'Add': () => {
            process.exit(0);
        },
        'Settings': () => {
            process.exit(0);
        },
        'Sort': () => {
            process.exit(0);
        },
        'Group': () => {
            process.exit(0);
        },
        'Quit': () => {
            process.exit(0);
        }
    },
    style: {
        selected: {
            bg: 'blue'
        }
    }
});


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
});

// Render the screen.
screen.render();
