const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const { getUserInfo, logIn } = require('./auth.controller');

router.get("/user", authenticationMiddleware(), getUserInfo);

router.post("/login", logIn);

module.exports = router;
