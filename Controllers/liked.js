const { extend } = require("lodash");
const postLikedVideo = async (req, res) => {
  try {
    let { user } = req;
    const likedvideo = req.body;
    user.liked.push(likedvideo);
    await user.save();
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to add video to liked videos" });
  }
};

const deleteLikedVideo = async (req, res) => {
  try {
    let { user } = req;
    const likedvideo_id = req.body.id;
    const updatedLiked = user.liked.filter(
      (video) => video.id !== likedvideo_id
    );
    user = extend(user, { liked: updatedLiked });
    await user.save();
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to remove video from liked videos",
      });
  }
};

module.exports = { postLikedVideo, deleteLikedVideo };
