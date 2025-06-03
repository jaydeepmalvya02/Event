// analytics.controller.js
const Analytics = require("../model/analyticsModel");

const saveAnalytics = async (req, res) => {
  try {
    const { deviceInfo, timestamp, page } = req.body;

    const entry = new Analytics({
      deviceInfo,
      timestamp,
      page,
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
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

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Helper to count unique IPs
    const countUniqueIPs = async (match = {}) => {
      const result = await Analytics.aggregate([
        { $match: match },
        { $group: { _id: "$ipAddress" } },
        { $count: "uniqueCount" },
      ]);
      return result[0]?.uniqueCount || 0;
    };

    // Helper to get unique device count based on IP
    const deviceStats = await Analytics.aggregate([
      {
        $group: {
          _id: { ip: "$ipAddress", deviceType: "$deviceInfo.deviceType" },
        },
      },
      {
        $group: {
          _id: "$_id.deviceType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Determine most used device
    let mostUsedDevice = "Unknown";
    let maxCount = 0;
    deviceStats.forEach((device) => {
      if (device.count > maxCount) {
        maxCount = device.count;
        mostUsedDevice = device._id || "Unknown";
      }
    });

    const [totalVisitors, todayCount, weekCount, monthCount] =
      await Promise.all([
        countUniqueIPs(),
        countUniqueIPs({ createdAt: { $gte: startOfToday } }),
        countUniqueIPs({ createdAt: { $gte: startOfWeek } }),
        countUniqueIPs({ createdAt: { $gte: startOfMonth } }),
      ]);

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
