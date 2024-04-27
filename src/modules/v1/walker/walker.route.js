const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const {
  updateLocation,
  fetchNearestWalker,
  postNewUser,
  patchUser
} = require("./walker.controller");

router.patch("/location", authenticationMiddleware(), updateLocation);

router.get("/nearby", authenticationMiddleware(), fetchNearestWalker);

router.post("/", authenticationMiddleware(), postNewUser);

router.patch("/", authenticationMiddleware(), patchUser);

module.exports = router;
