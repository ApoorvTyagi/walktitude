const mongoose = require("mongoose");
const logger = require('../../../util/logger/index')

const healthCheck = async (_req, res) => {
  const retValue = { is_success: false };
  const connection = mongoose.connection.readyState;
  if (connection === 1) {
    retValue.is_success = true;
    return res.status(200).json(retValue);
  }
  logger.info(`Health Check Connection => ${connection}`);
  return res.status(500).json(retValue);
};

module.exports = { healthCheck };