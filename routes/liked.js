const { User } = require("../models/user.model");
const { extend } = require("lodash");
const postLikedVideo = async (req, res) => {
  let { user } = req;
  const likedvideo = req.body;
  user.liked.push(likedvideo);
  await user.save();
  res.json({ success: true });
};

const deleteLikedVideo = async (req, res) => {
  let { user } = req;
  const likedvideo_id = req.body.id;
  const updatedLiked = user.liked.filter((video) => video.id !== likedvideo_id);
  user = extend(user, { liked: updatedLiked });

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({ success: true });
};

module.exports = { postLikedVideo, deleteLikedVideo };