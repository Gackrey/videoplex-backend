const { extend } = require("lodash");
const postHistory = async (req, res) => {
  let { user } = req;
  const historyvideo = req.body;
  const isAllreadyPresent = user.history.filter(
    (video) => video.id === historyvideo.id
  );

  if (isAllreadyPresent.length === 0) {
    try {
      user.history.push(historyvideo);
      await user.save();
      res.json({ success: true });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Unable to add video to history" });
    }
  }
  res.json({ success: false });
};

const deleteHistory = async (req, res) => {
  try {
    let { user } = req;
    const history_id = req.body.id;
    const updatedHistory = user.history.filter(
      (video) => video.id !== history_id
    );
    user = extend(user, { history: updatedHistory });
    await user.save();
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to remove video from history" });
  }
};

module.exports = { postHistory, deleteHistory };
