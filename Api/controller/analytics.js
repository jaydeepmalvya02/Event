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
    const now = new Date();

    // Set time boundaries
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(now); // Go to last Sunday
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total Visitors
    const totalVisitors = await Analytics.countDocuments();

    // Count by time periods
    const [todayCount, weekCount, monthCount] = await Promise.all([
      Analytics.countDocuments({ createdAt: { $gte: startOfToday } }),
      Analytics.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Analytics.countDocuments({ createdAt: { $gte: startOfMonth } }),
    ]);

    // Device type breakdown
    const deviceStats = await Analytics.aggregate([
      {
        $group: {
          _id: "$deviceInfo.deviceType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Find device type with max usage
    let mostUsedDevice = "Unknown";
    let maxCount = 0;
    deviceStats.forEach((device) => {
      if (device.count > maxCount) {
        maxCount = device.count;
        mostUsedDevice = device._id || "Unknown";
      }
    });

    res.json({
      totalVisitors,
      mostUsedDevice,
      deviceStats,
      visits: {
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    res.status(500).json({ error: "Failed to get stats" });
  }
};

module.exports = { saveAnalytics, getStats };
