const config = require("config");
const _ = require('lodash');
const boom = require('@hapi/boom');
const logger = require("../../../util/logger");
const errorDecorator = require("../../../util/error-decorator");
const service = require("./swipe.service");

const functionMap = {
  accept: service.acceptRequest,
  deny: service.denyRequest
}

const swipeRight = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const inviteeId = req.body.inviteeId;
  logger.debug(req.body.token);
  const result = await service.swipeRight(userId, inviteeId);
  res.send(result);
});

const request = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const { action, invitedBy } = req.body;
  if (_.isFunction(functionMap[action])) {
    const result = await functionMap[action](userId, invitedBy);
    return res.send(result);
  }
  throw boom.badRequest(`Invalid action: ${action}`);
});


module.exports = {
  swipeRight,
  request,
};
