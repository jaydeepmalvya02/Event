const express = require("express");
const {
  registerSpeaker,
  getAllspeakers,
  deleteSpeaker,
} = require("../controller/speakerUser");
const router = express.Router();

router.post("/speaker-user", registerSpeaker);
router.get("/speaker-list", getAllspeakers);
router.delete("/speaker-user/:id", deleteSpeaker);
module.exports = router;
