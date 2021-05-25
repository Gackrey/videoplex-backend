const { extend } = require("lodash");
const postHistory = async (req, res) => {
  let { user } = req;
  const historyvideo = req.body;
  const isAllreadyPresent = user.history.filter(
    (video) => video.id === historyvideo.id
  );

  if (isAllreadyPresent.length === 0) {
    user.history.push(historyvideo);
    await user.save();
    res.json({ success: true });
  }
  res.json({ success: false });
};

const deleteHistory = async (req, res) => {
  let { user } = req;
  const history_id = req.body.id;
  const updatedHistory = user.history.filter(
    (video) => video.id !== history_id
  );
  user = extend(user, { history: updatedHistory });
  await user.save();
  res.json({ success: true });
};

module.exports = { postHistory, deleteHistory };
