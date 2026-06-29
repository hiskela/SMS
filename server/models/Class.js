const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }, // example: 9A, 10B

    grade: {
      type: String,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      default: 40
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);