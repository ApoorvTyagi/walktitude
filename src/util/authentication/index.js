const config = require("config");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");

const validateToken = (token) => {
  const secret = config.JWT_PUBLIC_KEY;
  try {
    return jwt.verify(token, secret, { algorithm: "RS256" });
  } catch (error) {
    throw boom.unauthorized("Invalid Credentials.");
  }
};

module.exports = {
  validateToken,
};
