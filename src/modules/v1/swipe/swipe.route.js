const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const { swipeRight } = require('./swipe.controller');

router.post("/right", authenticationMiddleware(), swipeRight);

module.exports = router;
