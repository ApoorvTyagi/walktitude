const config = require('config');
const _ = require('lodash');
const errorDecorator = require("../../../util/error-decorator");
const service = require("./auth.service");

const getUserInfo = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const result = await service.getUserInfo(userId);
  res.send(result);
});

const logIn = errorDecorator(async (req, res) => {
  const { displayName, email, photoURL } = req.body;
  const result = await service.logIn({ displayName, email, photoURL });
  res.setHeader(
    "Set-Cookie",
    `token=${result.token}; path=/; expires=${
      Date.now() + config.APP.FOUR_DAYS_IN_SECONDS * 1000
    }; Secure; SameSite=None`
  );
  res.send(_.omit(result, ['__v', 'createdAt', 'updatedAt']));
});

module.exports = {
  getUserInfo,
  logIn,
};
