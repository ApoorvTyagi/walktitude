const logger = require("../util/logger/index");

function ValidationMiddleware(schema) {
  return function validatorMiddleware(request, response, next) {
    // Validate using the schema
    const result = schema.validate(request, {
      allowUnknown: true,
      convert: true,
    });
    // Check and handle error
    if (result.error) {
      logger.error(`Validation failed: ${result.error.toString()}`);
      return response.status(400).send({
        success: false,
        message: result.error.toString(),
      });
    }
    Object.assign(request, result.value);
    next();
  };
}

module.exports = ValidationMiddleware;
