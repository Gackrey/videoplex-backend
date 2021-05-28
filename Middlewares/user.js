const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.model");
const { extend } = require("lodash");
const getUserbyId = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    req.user = user;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not retrieve user " });
  }
};

const getUserDetails = (req, res) => {
  const { user } = req;
  user.__v = undefined;
  res.json({ success: true, user });
};

const updateUser = async (req, res) => {
  let { user } = req;
  const newdata = req.body;
  const updatedUser = {
    username: newdata.username,
    email: newdata.email,
    password: newdata.password,
  };
  user = extend(user, updatedUser);
  await user.save();
  res.json({
    success: true,
    id: user._id,
    icon: user.username[0],
  });
};

module.exports = { getUserbyId, getUserDetails, updateUser };
