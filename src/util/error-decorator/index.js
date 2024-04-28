const logger = require('../logger/index')
const errorDecorator = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    logger.error(`An unexpected error has occured: ${error}`)
    if (error.output?.statusCode < 500) {
      return res.status(error.output.statusCode).json({
        error: {
          message: error.message,
        },
        is_success: false,
      });
    }
    return res.status(500).json({
      error: {
        message: 'Oops! Something went wrong.',
      },
      is_success: false,
    });
  }
};

module.exports = errorDecorator;
