const express = require("express");
const router = express.Router();
const { login } = require("../Middlewares/login");
const { signup } = require("../Middlewares/signup");
const { postLikedVideo, deleteLikedVideo } = require("../Middlewares/liked");
const {
  postWatchLater,
  deleteWatchLater,
} = require("../Middlewares/watch-later");
const { postHistory, deleteHistory } = require("../Middlewares/history");
const {
  createNewPlaylist,
  deletePlaylist,
  postUpdatePlaylist,
  deleteUpdatePlaylist,
} = require("../Middlewares/playlist");

const {
  getUserbyId,
  getUserDetails,
  updateUser,
} = require("../Middlewares/user");
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
