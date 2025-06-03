// analytics.controller.js
const Analytics = require("../model/analyticsModel");

const saveAnalytics = async (req, res) => {
  try {
    const { deviceInfo, timestamp, page } = req.body;

    const entry = new Analytics({
      deviceInfo,
      timestamp,
      page,
    });

    await entry.save();

    res.status(201).json({ message: "Analytics saved" });
  } catch (error) {
    console.error("Analytics error:", error.message);
    res.status(500).json({ error: "Failed to save analytics" });
  }
};



const getStats = async (req, res) => {
  try {
    const totalVisitors = await Analytics.countDocuments();
    const deviceStats = await Analytics.aggregate([
      { $group: { _id: "$deviceInfo.deviceType", count: { $sum: 1 } } },
    ]);

    res.json({
      totalVisitors,
      deviceStats,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get stats" });
  }
};

module.exports = { saveAnalytics , getStats};
