const { User } = require("../models/user.model");
const createNewPlaylist = async (req, res) => {
  try {
    let { user } = req;
    const playlistName = req.body.name;
    user.playlist.push({ playlistName, playlistVideo: [] });
    await user.save();
    res.json({ success: true, user });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to create new playlist" });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    let { user } = req;
    const PLname = req.body.name;
    const updatedPlaylist = user.playlist.filter(
      (list) => list.playlistName !== PLname
    );
    user = extend(user, { playlist: updatedPlaylist });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

const postUpdatePlaylist = async (req, res) => {
  try {
    let { user } = req;
    const { name, video } = req.body;
    const selectedPlaylist = user.playlist.find(
      (list) => list.playlistName === name
    );
    selectedPlaylist.playlistVideo = [...selectedPlaylist.playlistVideo, video];
    await User.updateOne(
      { "playlist._id": selectedPlaylist._id },
      { $set: { "playlist.$.playlistVideo": selectedPlaylist.playlistVideo } }
    );
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to add video to playlist" });
  }
};

const deleteUpdatePlaylist = async (req, res) => {
  try {
    let { user } = req;
    const { name, delvideo } = req.body;
    const selectedPlaylist = user.playlist.find(
      (list) => list.playlistName === name
    );
    const filterArray = selectedPlaylist.playlistVideo.filter(
      (item) => item.id !== delvideo.id
    );
    await User.updateOne(
      { "playlist._id": selectedPlaylist._id },
      { $set: { "playlist.$.playlistVideo": filterArray } }
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({
      success: false,
      message: "Unable to delete video from playlist",
    });
  }
};

module.exports = {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
};
