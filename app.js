const express = require("express");
const serveStatic = require("serve-static");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport.js");
const config = require("./config/config");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Routes
require("./routes")(app);

app.use(serveStatic(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  const rootHtmlPath = path.resolve(__dirname, "..", "public", "index.html");
  res.sendFile(rootHtmlPath);
});

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
