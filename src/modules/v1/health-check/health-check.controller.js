const mongoose = require("mongoose");

const healthCheck = async (_req, res) => {
  const retValue = { is_success: false };
  if (mongoose.connection.readyState === 1) {
    retValue.is_success = true;
    return res.status(200).json(retValue);
  }
  return res.status(500).json(retValue);
};

module.exports = { healthCheck };