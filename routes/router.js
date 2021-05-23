const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { extend } = require("lodash");
const { postLikedVideo, deleteLikedVideo } = require("./liked");
const { postWatchLater, deleteWatchLater } = require("./watch-later");
const { postHistory, deleteHistory } = require("./history");
const {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
} = require("./playlist");

const { getUserbyId, updateUser } = require("./user");
router.route("/signup").post(async (req, res) => {
  try {
    const user = req.body;
    const NewUser = User(user);
    const savedUser = await NewUser.save();
    res.json({ success: true, id: savedUser._id, icon: savedUser.username[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to add users",
      errorMessage: err.message,
    });
  }
});

router.route("/login").post((req, res) => {
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
    res.status(500).json({
      success: false,
      message: "Unable to find user",
      errorMessage: err.message,
    });
  }
});

router.param("userID", getUserbyId);

router.route("/:userID").get((req, res) => {
  const { user } = req;
  user.__v = undefined;
  res.json({ success: true, user });
});

router.route("/:userID/updateuser").post(updateUser);

router.route("/:userID/history").post(postHistory).delete(deleteHistory);

router.route("/:userID/liked").post(postLikedVideo).delete(deleteLikedVideo);

router
  .route("/:userID/watch-later")
  .post(postWatchLater)
  .delete(deleteWatchLater);

router
  .route("/:userID/newplaylist")
  .post(createNewPlaylist)
  .delete(deletePlaylist);

router
  .route("/:userID/updateplaylist")
  .post(postUpdatePlaylist)
  .delete(deleteUpdatePlaylist);

module.exports = router;
