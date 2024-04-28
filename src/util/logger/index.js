const { createLogger, format, transports } = require("winston");
const morgan = require("morgan");

const logFormat = format.printf((info) => {
  if (info.message instanceof Object)
    info.message = `\n${JSON.stringify(info.message, null, 4)}`;
  return `${info.timestamp}: [${info.level}]  ${info.message}`;
});
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.colorize(),
    logFormat
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});
logger.successHandler = morgan('info', {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message) },
});
logger.errorHandler = morgan('info', {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message) },
});

module.exports = logger;
