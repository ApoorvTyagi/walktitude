const router = require("express").Router();
const { healthCheck } = require("./health-check.controller");

router.get("/", healthCheck);

module.exports = router;
