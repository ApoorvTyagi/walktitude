const config = {
  APP: {
    NODE_ENV: "development",
    PORT: 3000,
    JWT_PUBLIC_KEY: "",
    JWT_PRIVATE_KEY: "",
    NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH: 500,
  },
  DB: {
    LOCAL_URI:
      "mongodb://localhost:27017/walktitude?readPreference=primary&ssl=false&directConnection=true",
    URI: "mongodb+srv://admin:admin@cluster0.ordawt9.mongodb.net/walktitude?retryWrites=true&w=majority",
  },
};

module.exports = config;
