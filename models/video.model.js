const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = new Schema({
  id: String,
  snippet: {
    publishedAt: String,
    title: String,
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number
      },
      medium: {
        url: String,
        width: Number,
        height: Number
      },
      high: {
        url: String,
        width: Number,
        height: Number
      },
      standard: {
        url: String,
        width: Number,
        height: Number
      },
    },
    channelTitle: String,
    statistics: {
      viewCount: Number,
      likeCount: Number,
      dislikeCount: Number,
      commentCount: Number
    }
  }
})

const Video = mongoose.model("Video", videoSchema);
module.exports = { Video }