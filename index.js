var nconf = require('nconf');
var path = require('path');
var AppDirectory = require('appdirectory');
var dirs = new AppDirectory('terminalstocks');
var blessed = require('blessed');
var moment = require('moment');
var yahooFinance = require('yahoo-finance');

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
var clock = blessed.text({
    parent: screen,
    right: 0,
    content: 'terminal stocks!'
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
});

blessed.listtable({
    tags: true,
    parent: screen,
    height: '100%',
    width: '100%',
    top: 4
});

// This replaces the deprecated snapshot() API
yahooFinance.quote({
    symbol: 'AAPL',
    modules: ['price', 'summaryDetail'] // see the docs for the full list
}, function(err, quotes) {
    console.log(quotes, err);
});

// Render the screen.
screen.render();

setInterval(() => {
    clock.setContent(moment().format('MMMM Do YYYY, h:mm:ss a'));
    screen.render();
}, 1000);
