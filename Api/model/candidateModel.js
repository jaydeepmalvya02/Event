const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      
    },
    name: {
      type: String,
      
      trim: true,
    },
    email: {
      type: String,
     
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume file URL is required"],
    },
    jobData:{
      type:Object,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidates", candidateSchema);
