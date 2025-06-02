// routes/whatsappRoutes.js
const express = require("express");
const router = express.Router();
const { sendWhatsappMessage } = require("../controller/whatsapp");

router.post("/send-whatsapp", sendWhatsappMessage);

module.exports = router;
