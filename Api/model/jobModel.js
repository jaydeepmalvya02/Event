const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
    },
    description: {
      type: String,
      maxLength: 500,
      required: true,
    },
    email:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
