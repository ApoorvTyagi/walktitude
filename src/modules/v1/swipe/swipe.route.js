const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const { swipeRight, request } = require('./swipe.controller');

router.post("/right", authenticationMiddleware(), swipeRight);

router.post("/request", request);

module.exports = router;
