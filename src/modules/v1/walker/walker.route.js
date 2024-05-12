const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const {
  updateLocation,
  fetchNearestWalker,
  patchUser,
  getUser,
} = require("./walker.controller");

router.patch("/location", authenticationMiddleware(), updateLocation);

router.get("/nearby", authenticationMiddleware(), fetchNearestWalker);

router.get("/", authenticationMiddleware(), getUser);

router.patch("/", authenticationMiddleware(), patchUser);

module.exports = router;
