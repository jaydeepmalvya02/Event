const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();
const router = express.Router();

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    // Function to handle the stream upload image to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // User streamifier to stream the file buffer
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // call the streamUpload function with the fileBuffer
    const result = await streamUpload(req.file.buffer);
    // response with the uploaded image URL
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.post("/uploadPdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please provide a PDF file" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "pdf", // required for PDFs
             access_mode: "public", // optional, defaults to public
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
