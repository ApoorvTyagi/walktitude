const config = require("config");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { setupModels } = require("./src/models/index");

const connectDB = async () => {
  const url = config.DB.URI;
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
    setupModels();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;

  dbConnection.on("error", (error) => {
    console.log(error.message);
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
    console.log(error);
  }
};

bootstrap();
