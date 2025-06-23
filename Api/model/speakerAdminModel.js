const mongoose = require("mongoose");

const speakerUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    department: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    division: {
      type: String,
    },
    experience: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model('SpeakerUser',speakerUserSchema)
