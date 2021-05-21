const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { extend } = require("lodash");

router.route("/signup").post(async (req, res) => {
  try {
    const user = req.body;
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, id: savedUser._id, icon: savedUser.username[0] });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to add users",
        errorMessage: err.message,
      });
  }
});

router
  .route("/login")
  .get((req, res) => {
    res.send("Login");
  })
  .post((req, res) => {
    const user = req.body;
    try {
      User.findOne(user, function (err, docs) {
        if (docs === null) {
          res
            .status(500)
            .json({ success: false, message: "Unable to find user" });
        } else {
          res.json({ success: true, id: docs._id, icon: docs.username[0] });
        }
      });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to find user",
          errorMessage: err.message,
        });
    }
  });

router.param("userID", async (req, res, next, id) => {
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
});

router.route("/:userID").get((req, res) => {
  const { user } = req;
  user.__v = undefined;
  res.json({ success: true, user });
});

router.route("/:userID/updateuser").post(async (req, res) => {
  let { user } = req;
  const newdata = req.body;
  const updatedUser = {
    username: newdata.username,
    email: newdata.email,
    password: newdata.password,
  };

  user = extend(user, updatedUser);

  const NewUser = User(user);
  const savedUser = await NewUser.save();
  res.json({
    success: true,
    id:savedUser._id,
    icon: savedUser.username[0],
  });
});

router
  .route("/:userID/history")
  .post(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    let { user } = req;
    const history_id = req.body.id;
    const updatedHistory = user.history.filter(
      (video) => video.id !== history_id
    );
    user = extend(user, { history: updatedHistory });

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true });
  });

router
  .route("/:userID/liked")
  .post(async (req, res) => {
    let { user } = req;
    const likedvideo = req.body;
    user.liked.push(likedvideo);
    await user.save();
    res.json({ success: true });
  })
  .delete(async (req, res) => {
    let { user } = req;
    const likedvideo_id = req.body.id;
    const updatedLiked = user.liked.filter(
      (video) => video.id !== likedvideo_id
    );
    user = extend(user, { liked: updatedLiked });

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true });
  });

router
  .route("/:userID/watch-later")
  .post(async (req, res) => {
    let { user } = req;
    const watchlater = req.body;
    user.watch_later.push(watchlater);
    await user.save();
    res.json({ success: true });
  })
  .delete(async (req, res) => {
    let { user } = req;
    const watch_later_id = req.body.id;
    const updatedLater = user.watch_later.filter(
      (video) => video.id !== watch_later_id
    );
    user = extend(user, { watch_later: updatedLater });

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true });
  });

router
  .route("/:userID/newplaylist")
  .post(async (req, res) => {
    let { user } = req;
    const playlistName = req.body.name;
    user.playlist[playlistName] = [];

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  })
  .delete(async (req, res) => {
    let { user } = req;
    const playlistName = req.body.name;
    delete user.playlist[playlistName];

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  });

router
  .route("/:userID/updateplaylist")
  .post(async (req, res) => {
    let { user } = req;
    const { name, video } = req.body;
    user.playlist[name].push(video);

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  })
  .delete(async (req, res) => {
    let { user } = req;
    const { name, delvideo } = req.body;
    user.playlist[name] = user.playlist[name].filter(
      (video) => video.id !== delvideo.id
    );

    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  });
module.exports = router;
