const { extend } = require("lodash");
const postWatchLater = async (req, res) => {
  try {
    let { user } = req;
    const watchlater = req.body;
    user.watch_later.push(watchlater);
    await user.save();
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to add video to watch-later" });
  }
};

const deleteWatchLater = async (req, res) => {
  try {
    let { user } = req;
    const watch_later_id = req.body.id;
    const updatedLater = user.watch_later.filter(
      (video) => video.id !== watch_later_id
    );
    user = extend(user, { watch_later: updatedLater });
    await user.save();
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to remove video from watch-later",
      });
  }
};

module.exports = { postWatchLater, deleteWatchLater };
