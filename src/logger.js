import Winston from 'winston';

const logLevel = 'info';

const isProduction = process.env.NODE_ENV === 'production';

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

// Turn file writes off for now deployment
// if (!isProduction) {
//     logger.add(
//         new Winston.transports.File({
//             level: logLevel,
//             filename: 'logs/error.log',
//             handleExceptions: true,
//             json: true,
//             colorize: true
//         })
//     );
// }

export default logger;
