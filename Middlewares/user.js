const { User } = require("../models/user.model");
const { extend } = require("lodash");
const getUserbyId = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
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

const updateUser = async (req, res) => {
  let { user } = req;
  const newdata = req.body;
  const updatedUser = {
    username: newdata.username,
    email: newdata.email,
    password: newdata.password,
  };
  user = extend(user, updatedUser);
  await user.save()
  res.json({
    success: true,
    id: user._id,
    icon: user.username[0],
  });
};

module.exports = { getUserbyId, updateUser };
