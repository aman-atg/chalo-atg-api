const bcrypt = require("bcrypt");
const ash = require("express-async-handler");
const User = require("../models/user.model");

const register = ash(async (req, res, next) => {
  try {
    const doesUserExist = await User.findOne({ email: req.body.email });
    if (doesUserExist)
      return next({
        message: "User with this email already exists.",
        statusCode: 409,
      });

    const user = await new User(req.body);
    user.save();
    const token = user.getToken();

    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    return next({ message: "Something went wrong2!", statusCode: 500 });
  }
});

const login = ash(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next({
      message: "Please provide all the required values!",
      statusCode: 400,
    });

  const user = await User.findOne({ email });

  if (!user)
    return next({
      message: "The email is not yet registered!",
      statusCode: 400,
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next({ message: "Wrong password!", statusCode: 400 });
  }

  const token = user.getToken();
  res.status(200).json({ success: true, data: { token } });
});

module.exports = { register, login };
