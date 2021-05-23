const createNewPlaylist = async (req, res) => {
  let { user } = req;
  const playlistName = req.body.name;
  user.playlist[playlistName] = [];

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({ success: true, savedUser });
};

const deletePlaylist = async (req, res) => {
  let { user } = req;
  const playlistName = req.body.name;
  delete user.playlist[playlistName];

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({ success: true, savedUser });
};

const postUpdatePlaylist = async (req, res) => {
  let { user } = req;
  const { name, video } = req.body;
  user.playlist[name].push(video);

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({ success: true, savedUser });
};

const deleteUpdatePlaylist = async (req, res) => {
  let { user } = req;
  const { name, delvideo } = req.body;
  user.playlist[name] = user.playlist[name].filter(
    (video) => video.id !== delvideo.id
  );

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({ success: true, savedUser });
};

module.exports = {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
};
