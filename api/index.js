//Load express module with `require` directive
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database");

const { singIn } = require("./routes/signin");
const { signUp } = require("./routes/signup");
const { listUsers } = require("./routes/user");

require("./config/passport")(passport);
mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});

// routes
app.get("/ping", function (req, res) {
  res.send("pong");
});

singIn(app);
signUp(app);
listUsers(app);

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json(error);
});
