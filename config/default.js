const config = {
  APP: {
    NODE_ENV: "development",
    PORT: 3000,
    JWT_PUBLIC_KEY: "",
    JWT_PRIVATE_KEY: "",
    NEAREST_WALKER_MAX_DISTANCE_FOR_SEARCH: 500,
    FOUR_DAYS_IN_SECONDS: 345600,
  },
  DB: {
    LOCAL_URI:
      "mongodb://localhost:27017/walktitude?readPreference=primary&ssl=false&directConnection=true",
    URI: "mongodb+srv://admin:admin@cluster0.ordawt9.mongodb.net/walktitude?retryWrites=true&w=majority",
  },
  EXTERNAL_API_ENDPOINTS: {
    PUSH_NOTIFICATION_URI: "",
  },
};

module.exports = config;
