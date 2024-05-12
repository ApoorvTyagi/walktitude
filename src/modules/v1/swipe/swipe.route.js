const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const ValidationMiddleware = require("../../../middlewares/validation.middleware");
const { postSwipeRightSchema } = require('./swipe.schema')
const { swipeRight, request } = require('./swipe.controller');

router.post(
  "/right",
  authenticationMiddleware(),
  ValidationMiddleware(postSwipeRightSchema),
  swipeRight
);

router.post("/request", authenticationMiddleware(), request);

module.exports = router;
