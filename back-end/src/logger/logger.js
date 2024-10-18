import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp}:${info.message}`)
    )
});

export default logger;