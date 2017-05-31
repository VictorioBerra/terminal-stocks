const nconf = require('nconf');
const path = require('path');
const AppDirectory = require('appdirectory');
const dirs = new AppDirectory('terminalstocks');
const blessed = require('blessed');
const moment = require('moment');
const yahooFinance = require('yahoo-finance');
const Promise = require('bluebird');

const userConfigFilePath = path.join(dirs.userConfig(), 'config.json');

nconf.argv()
    .env()
    .file({
        file: userConfigFilePath
    });

nconf.defaults({
    'symbols': [
        'AAPL',
        'T'
    ],
    'columns': [
        'currentPrice'
    ]
});

if (nconf.get('config')) {
    nconf.file('user-config', userConfigFilePath);
}

var symbols = nconf.get('symbols');
var columns = nconf.get('columns');

// Create a screen object.
const screen = blessed.screen({
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
    tags: true,
    parent: screen,
    right: 0,
    content: 'terminal stocks!'
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
});

var tickerListTable = blessed.listtable({
    border: 'line',
    parent: screen,
    height: '100%',
    width: '100%',
    top: 1,
    mouse: true,
    keys: true,
    content: 'Fetching stocks...',
    header: {
        bold: true
    },
    style: {
        cell: {
            selected: {
                bg: 'blue'
            }
        }
    }

});


var rows = [
    [
        'symbol',
        ...columns
    ]
];
var quotePromises = [];
symbols.forEach((ticker) => {
    quotePromises.push(yahooFinance.quote({
        symbol: ticker,
        modules: ['financialData']
    }).then((quote) => {
        let financialData = quote.financialData;
        let newRow = [ticker];
        columns.forEach((column) => {
            newRow.push(financialData[column].toString());
        });
        rows.push(newRow);
    }));
});

Promise.all(quotePromises).then(() => {
    clock.setContent('Updated: ' + moment().format('h:mm:ss a'));
    tickerListTable.setData(rows);
    screen.render();
    tickerListTable.focus();
});

screen.render();

setInterval(() => {

}, 1000);
