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
      Date.now() + 7 * 12 * 60 * 60 * 1000
    }; SameSite=None`
  );
  res.send(_.omit(result, ['__v', 'createdAt', 'updatedAt', 'token']));
});

module.exports = {
  getUserInfo,
  logIn,
};
