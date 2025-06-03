const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    deviceInfo: {
      os: String,
      browser: String,
      deviceType: String,
      vendor: String,
      model: String,
    },
    ipAddress: String,     
    userAgent: String,
    page: String,
    timestamp: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
