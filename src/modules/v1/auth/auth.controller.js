const errorDecorator = require("../../../util/error-decorator");
const service = require("./auth.service");

const getUserInfo = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const result = await service.getUserInfo(userId);
  res.send(result);
});

const logIn = errorDecorator(async (req, res) => {

});

const signUp = errorDecorator(async (req, res) => {

});

module.exports = {
  getUserInfo,
  logIn,
  signUp,
};
