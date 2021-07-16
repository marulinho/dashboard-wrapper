//Load express module with `require` directive
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const ApplicationError = require("../models/application-error");

function singIn(router) {
  router.post("/signin", checkBody, checkUser);
}

const checkBody = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    return next();
  }
  next(
    new ApplicationError({
      status: 400,
      message: "Email and password are required",
    })
  );
};

const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new ApplicationError({ status: 404, message: "User doesn't exists" })
    );
  }
  user.comparePassword(password, function (err, isMatch) {
    if (isMatch && !err) {
      var token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 604800, // one week
      });
      return res.status(200).json({ status: "success", token: `JWT ${token}` });
    }
    return next(
      new ApplicationError({
        status: 401,
        message: "Invalid user or password.",
      })
    );
  });
};

module.exports = { singIn };
