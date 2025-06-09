const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/event");

router.get("/event", getAllEvents);
router.get("/event/:id", getEventById);
router.post("/event", createEvent);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

module.exports = router;
