const router = require("express").Router();
const authenticationMiddleware = require("../../../middlewares/auth.middleware");
const { getUserInfo, logIn, signUp } = require('./auth.controller');

router.get("/user", authenticationMiddleware(), getUserInfo);

router.post("/login", logIn);

router.post("/sign-up", signUp);

module.exports = router;
