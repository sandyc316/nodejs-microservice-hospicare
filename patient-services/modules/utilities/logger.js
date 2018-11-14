const winston = require('winston');

var getLogger = module => {
    console.log(module);
    var path = module.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            }),
            new (winston.transports.File)({
                filename: 'debug.log', 
                silent: false}
            )
        ]
    });
};

module.exports = getLogger;
