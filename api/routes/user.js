const passport = require("passport");
require("../config/passport")(passport);

const User = require("../models/user");

function listUsers(router) {
  router.get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    buildResponse
  );
}

const buildResponse = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ users: JSON.stringify(users) });
};

module.exports = { listUsers };
