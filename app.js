const express = require("express");
const config = require('config');
const cors = require("cors");
const logger = require("./src/util/logger/index");

const app = express();
const PORT = config.APP.PORT || 3000;

app.use(logger.successHandler);
app.use(logger.errorHandler);

const corsConfig = {
  credentials: true,
  origin: (_origin, callback) => {
      return callback(null, true);
  },
};
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "15mb" }));

const setupRoutes = require("./src/modules");
app.use("/", setupRoutes());
// not found handler
app.use("*", (_req, res) =>
  res.status(404).json({ error: { message: "URL not found" }, is_success: false })
);

app.listen(PORT, (_) => {
  logger.info(`App listening on port: ${PORT} | ENV: ${config.APP.NODE_ENV}`);
});
