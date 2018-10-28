const winston = require('winston'),
  expressWinston = require('express-winston-2'),
  env = process.env.DEV_ENV || 'development',
  configuration = require(`../config/environments/${env}`);

var options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: `../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const createLogger = function(filename) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: configuration.logLevel, colorize: true }),
      new (winston.transports.File)({
        filename: `./logs/${filename}.log`,
        level: configuration.logLevel,
      }),
    ]
  });
}

const logger = {
  initLogger() {
    global.logger = createLogger(`${env}-error`);
  },
  httpLogger(req, res, next) {
    const logger = createLogger(`${env}-info-http`);
    logger.info(req);
    return next();
  },
};

module.exports = logger;
