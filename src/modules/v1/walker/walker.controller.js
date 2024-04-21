const config = require("config");
const errorDecorator = require('../../../util/error-decorator');
const service = require('./walker.service')

const updateLocation = errorDecorator(async (req, res) => {
  const latitude = Number(req.body.latitude);
  const longitude = Number(req.body.longitude);
  const { userId } = req.header["x-user-details"];
  const result = await service.updateLocation(longitude, latitude, userId);
  res.send({
    result,
  });
});


const fetchNearestWalker = errorDecorator(async(req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const nearestWalkers = await service.fetchNearestWalker(
    [longitude, latitude],
    Number(config.APP.NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH)
  );
  res.send({
    walkers: nearestWalkers,
  });
});

const postNewUser = errorDecorator(async(req, res) => {
  const { firstName, lastName, emailId, latitude, longitude, image, googleId } = req.body;
  const user = await service.postNewUser({ firstName, lastName, emailId, latitude, longitude, image, googleId });
  res.send({
    user,
  });
});

module.exports = {
  updateLocation,
  fetchNearestWalker,
  postNewUser,
};