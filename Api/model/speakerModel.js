const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required:true,
      unique:true,
    },
    title: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports=mongoose.model("Speaker",speakerSchema)