const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: "./config/config.env" });

// connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// Make the API use JSON
app.use(express.json({ limit: "15mb" }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, (_) => {
  console.log(`App listening on port: ${PORT}`);
});
