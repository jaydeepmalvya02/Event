const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
});

module.exports = mongoose.model("VideoConfig", videoSchema);
