import Winston from 'winston';

const logLevel = 'info';

const logger = new Winston.Logger({
    level: 'info',
    transports: [
        new Winston.transports.Console({
            level: logLevel,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

export default logger;
