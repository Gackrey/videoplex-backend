const { User } = require("../models/user.model");
const createNewPlaylist = async (req, res) => {
  try{
    let { user } = req;
    const playlistName = req.body.name;
    user.playlist[playlistName] = [];
  
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  }
  catch{
    res.status(500).json({ success: false, message:"Unable to create new playlist" });
  }
};

const deletePlaylist = async (req, res) => {
  try{
    let { user } = req;
    const playlistName = req.body.name;
    delete user.playlist[playlistName];
  
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  }
  catch{
    res.status(500).json({ success: false, message:"Unable to delete playlist" });
  }
};

const postUpdatePlaylist = async (req, res) => {
  try{
    let { user } = req;
    const { name, video } = req.body;
    user.playlist[name].push(video);
  
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  }
  catch{
    res.status(500).json({ success: false, message:"Unable to add video to playlist" });
  }
};

const deleteUpdatePlaylist = async (req, res) => {
  try{
    let { user } = req;
    const { name, delvideo } = req.body;
    user.playlist[name] = user.playlist[name].filter(
      (video) => video.id !== delvideo.id
    );
  
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  }
  catch{
    res.status(500).json({ success: false, message:"Unable to delete video from playlist" });
  }
};

module.exports = {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
};
