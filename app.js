const express = require("express");
const config = require('config');
const cors = require("cors");

const app = express();
const PORT = config.APP.PORT || 3000;

const corsConfig = {
  credentials: true,
  origin: (origin, callback) => {
      return callback(null, true);
  },
};

app.options("*", cors(corsConfig));

app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "15mb" }));

const setupRoutes = require("./src/modules");
app.use("/", setupRoutes());

app.listen(PORT, (_) => {
  console.log(`App listening on port: ${PORT}`);
});
