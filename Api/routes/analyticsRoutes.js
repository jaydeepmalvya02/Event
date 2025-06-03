// analytics.routes.js
const express = require("express");
const router = express.Router();
const { saveAnalytics, getStats } = require("../controller/analytics");

router.post("/analytics", saveAnalytics);

router.get("/analytics/stats", getStats);

module.exports = router;
