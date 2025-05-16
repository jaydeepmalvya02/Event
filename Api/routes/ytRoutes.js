const express = require("express");
const router = express.Router();
const { getVideoId, updateVideoId } = require("../controller/yt");

router.get("/videoId", getVideoId);
router.post("/videoId", updateVideoId);

module.exports = router;
