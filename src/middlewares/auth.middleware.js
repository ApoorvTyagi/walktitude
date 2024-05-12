const _ = require("lodash");
const boom = require("@hapi/boom");

const { validateToken } = require("../util/authentication/index");
const errorDecorator = require("../util/error-decorator/index");

function authenticationMiddleware() {
  return errorDecorator((req, _res, next) => {
    const authToken = req.headers.authorization;
    if (authToken && _.isArray(authToken.split(" "))) {
      userToken = authToken.split(" ")[1];
      if (userToken) {
        const entityData = validateToken({ token: userToken });
        req.headers["x-user-details"] = entityData;
        return next();
      }
      throw boom.unauthorized("Invalid Token");
    }
    // TODO: REMOVE THIS, Only For Debugging
    // req.headers["x-user-details"] = {
    //   userId: "66251505e324473a611b4d50",
    // };
    return next();
  });
}

module.exports = authenticationMiddleware;
