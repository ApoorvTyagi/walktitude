const config = require("config");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");
const logger = require("../logger/index");

const validateToken = ({ token }) => {
  const secret = config.APP.JWT_PUBLIC_KEY;
  try {
    return jwt.verify(token, secret, { algorithm: "RS256" });
  } catch (error) {
    throw boom.unauthorized("Invalid Credentials.");
  }
};

const mintToken = (payload) => {
  const secret = config.APP.JWT_PRIVATE_KEY;
  let token;
  try {
    token = jwt.sign(payload, secret, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });
  } catch (error) {
    logger.error(`Unable to generate token: ${error}`);
    throw boom.badData("Unable to generate token");
  }
  return token;
};

module.exports = {
  validateToken,
  mintToken,
};
