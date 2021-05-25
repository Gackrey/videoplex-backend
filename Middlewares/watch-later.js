const { extend } = require("lodash");
const postWatchLater = async (req, res) => {
  let { user } = req;
  const watchlater = req.body;
  user.watch_later.push(watchlater);
  await user.save();
  res.json({ success: true });
};

const deleteWatchLater = async (req, res) => {
  let { user } = req;
  const watch_later_id = req.body.id;
  const updatedLater = user.watch_later.filter(
    (video) => video.id !== watch_later_id
  );
  user = extend(user, { watch_later: updatedLater });
  await user.save()
  res.json({ success: true });
};

module.exports = { postWatchLater, deleteWatchLater };
