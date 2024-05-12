const config = require("config");
const errorDecorator = require('../../../util/error-decorator');
const service = require('./walker.service')

const fetchNearestWalker = errorDecorator(async(req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const { userId } = req.headers["x-user-details"];
  const nearestWalkers = await service.fetchNearestWalker(
    userId,
    [longitude, latitude],
    Number(config.APP.NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH)
  );
  res.send({
    walkers: nearestWalkers,
  });
});

const updateLocation = errorDecorator(async (req, res) => {
  const latitude = Number(req.body.latitude);
  const longitude = Number(req.body.longitude);
  const { userId } = req.headers["x-user-details"];
  const result = await service.updateLocation(longitude, latitude, userId);
  res.send({
    result,
  });
});


const patchUser = errorDecorator(async (req, res) => {
  const { userId } = req.headers["x-user-details"];
  const { is_premium_user, is_ghost_mode, web_device_token, walk } = req.body;
  const result = await service.patchUser(userId, {
    is_premium_user,
    is_ghost_mode,
    web_device_token,
    walk,
  });
  res.send(result);
});

const getUser = errorDecorator(async ( req, res ) => {
  const userId = req.query.userId;
  const result = await service.getUser(userId);
  res.send(result);
})

module.exports = {
  updateLocation,
  fetchNearestWalker,
  patchUser,
  getUser,
};