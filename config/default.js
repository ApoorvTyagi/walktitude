const config = {
  APP: {
    NODE_ENV: "development",
    PORT: 3000,
    JWT_PUBLIC_KEY: '',
    NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH: 500,
  },
  DB: {
    URI: "mongodb://localhost:27017/walktitude",
  },
};

module.exports = config;
