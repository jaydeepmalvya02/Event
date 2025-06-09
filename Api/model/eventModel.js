const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    eventLink: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\/.+/,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
      match:
        /^((([0-1]?[0-9]|2[0-3]):[0-5][0-9])|((0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)))$/i,
    },
    mode: {
      type: String,
      enum: ["Online Event", "Offline Event"],
      default: "Online Event",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
