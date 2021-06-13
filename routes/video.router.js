const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");
router.route("/all-video").get(async (req, res) => {
  const items = await Video.find({});
  res.json(items);
});
module.exports = router;
