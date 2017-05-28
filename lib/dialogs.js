var blessed = require('blessed');

function getInputDialog() {
    var self = this;
    
    var form = blessed.form({
        parent: self.screen,
        keys: true,
        top: 'center',
        left: 'center',
        width: '50%',
        height: '20%',
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'blue',
            border: {
                fg: '#f0f0f0'
            },
            hover: {
                bg: 'green'
            }
        },
        content: 'Type a stock ticker to add:'
    });

    blessed.textbox({
        parent: form,
        mouse: true,
        keys: true,
        shrink: true,
        width: '90%',
        left: 'center',
        top: 2,
    });

    var cancel = blessed.button({
        parent: form,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 1,
            right: 1
        },
        left: 0,
        bottom: 1,
        name: 'cancel',
        content: 'cancel',
        style: {
            bg: 'blue',
            focus: {
                bg: 'red'
            },
            hover: {
                bg: 'red'
            }
        }
    });

    var submit = blessed.button({
        parent: form,
        mouse: true,
        keys: true,
        shrink: true,
        padding: {
            left: 1,
            right: 1
        },
        right: 0,
        bottom: 1,
        name: 'submit',
        content: 'submit',
        style: {
            bg: 'blue',
            focus: {
                bg: 'red'
            },
            hover: {
                bg: 'red'
            }
        }
    });

    submit.on('press', function() {
        form.submit();
    });

    cancel.on('press', function() {
        self.screen.remove(form);
    });

    form.on('submit', function() {
        form.setContent('Submitted.');
        self.screen.render();
    });

    form.on('reset', function() {
        form.setContent('Canceled.');
        self.screen.render();
    });

}

module.exports = function(screen) {
    return {
        screen: screen,
        getInputDialog: getInputDialog
    };
};
