const config = require("config");
const errorDecorator = require("../../../util/error-decorator");
const service = require("./swipe.service");

const swipeRight = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const inviteeId = req.body.inviteeId;
  const result = await service.swipeRight(userId, inviteeId);
  res.send(result);
});


module.exports = {
  swipeRight,
};
