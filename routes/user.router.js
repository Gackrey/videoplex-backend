const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/login");
const { signup } = require("../Controllers/signup");
const { postLikedVideo, deleteLikedVideo } = require("../Controllers/liked");
const {
  postWatchLater,
  deleteWatchLater,
} = require("../Controllers/watch-later");
const { postHistory, deleteHistory } = require("../Controllers/history");
const {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
} = require("../Controllers/playlist");

const {
  getUserbyId,
  getUserDetails,
  updateUser,
} = require("../Controllers/user");
router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/userDetails").get(getUserbyId, getUserDetails);

router.route("/updateuser").post(getUserbyId, updateUser);

router
  .route("/history")
  .post(getUserbyId, postHistory)
  .delete(getUserbyId, deleteHistory);

router
  .route("/liked")
  .post(getUserbyId, postLikedVideo)
  .delete(getUserbyId, deleteLikedVideo);

router
  .route("/watch-later")
  .post(getUserbyId, postWatchLater)
  .delete(getUserbyId, deleteWatchLater);

router
  .route("/newplaylist")
  .post(getUserbyId, createNewPlaylist)
  .delete(getUserbyId, deletePlaylist);

router
  .route("/updateplaylist")
  .post(getUserbyId,postUpdatePlaylist)
  .delete(getUserbyId,deleteUpdatePlaylist);

module.exports = router;
