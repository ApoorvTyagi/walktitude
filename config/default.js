const config = {
  APP: {
    NODE_ENV: "development",
    PORT: 3000,
    JWT_PUBLIC_KEY: "",
    JWT_PRIVATE_KEY: "",
    NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH: 500,
  },
  DB: {
    URI: "mongodb+srv://admin:admin@cluster0.ordawt9.mongodb.net/walktitude?retryWrites=true&w=majority",
  },
};

module.exports = config;
