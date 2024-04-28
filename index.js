const config = require("config");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { setupModels } = require("./src/models/index");
const logger = require('./src/util/logger/index')

const connectDB = async () => {
  const url = config.DB.URI;
  try {
    mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Database connected");
    setupModels();
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.on("error", (error) => {
    logger.error(error.message);
  });
};

const bootstrap = async () => {
  try {
    // connect to Database
    await connectDB();
    config.APP.JWT_PUBLIC_KEY = fs.readFileSync(
      path.join(__dirname, "./config/public.key"),
      "utf-8"
    );
    config.APP.JWT_PRIVATE_KEY = fs.readFileSync(
      path.join(__dirname, "./config/private.key"),
      "utf-8"
    );
    require("./app");
  } catch (error) {
    logger.error(`Error in bootstrap: ${error}`);
  }
};

bootstrap();
