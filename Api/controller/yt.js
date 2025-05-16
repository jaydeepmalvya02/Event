const VideoConfig = require("../model/ytidModel");

const getVideoId = async (req, res) => {
  const config = await VideoConfig.findOne();
  if (!config) return res.status(404).json({ message: "No video ID set" });
  res.json({ videoId: config.videoId });
};

const updateVideoId = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId) return res.status(400).json({ message: "Video ID required" });

  let config = await VideoConfig.findOne();
  if (config) {
    config.videoId = videoId;
    await config.save();
  } else {
    config = await VideoConfig.create({ videoId });
  }
  res.json({ message: "Video ID updated", videoId });
};

module.exports = { getVideoId, updateVideoId };
