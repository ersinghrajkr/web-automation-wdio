
import winston, { error } from 'winston';


// format console.log
const consoleFormat = winston.format.printf( ({level, message }) => {
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    return `[${logLevel}: ${message}]`
})

// Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: true,
        format: winston.format.combine(winston.format.timestamp(), consoleFormat)
    })
  ],
});

logger.on('error', error => {
    console.log('Unknown error in winston logger !')
    console.log(error.message);
})

export default logger;