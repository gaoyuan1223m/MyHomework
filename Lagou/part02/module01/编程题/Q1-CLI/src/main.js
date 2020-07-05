const program = require('commander');
const path = require('path');
const { version } = require('./constants');

const mapAction = { 
    create: {
        alias: 'c',
        description: 'create a project',
        examples: [
            'ryan-cli create <project-name>',
        ],
    },
    '*': {
        alias: '',
        description: 'command not found',
        examples: [],
    },
};
Reflect.ownKeys(mapAction).forEach((action) => {
    program
        .command(action)
        .alias(mapAction[action].alias) 
        .description(mapAction[action].description) 
        .action(() => {
            if (action === '*') { 
                console.log(mapAction[action].description);
            } else {
                require(path.resolve(__dirname, action))(...process.argv.slice(3));
            }
        });
});

program.on('--help', () => {
    console.log('\nExample');
    Reflect.ownKeys(mapAction).forEach((action) => {
        mapAction[action].examples.forEach((item) => {
            console.log(item);
        });
    });
});

program
    .version(version)
    .parse(process.argv);