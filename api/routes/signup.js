const User = require("../models/user");
const ApplicationError = require("../models/application-error");

function signUp(router) {
  router.post("/signup", checkBody, checkExistUser, create);
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

const checkExistUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next();
  }
  return next(new ApplicationError({ status: 400, message: "User exists" }));
};

const create = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(200).json(user);
};

module.exports = { signUp };
