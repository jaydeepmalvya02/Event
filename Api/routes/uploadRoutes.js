const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for image types (optional but recommended)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
});

// Upload endpoint
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    res.json({ message: "Image uploaded successfully", path: filePath });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
