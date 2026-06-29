const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    code: {
      type: String,
      required: true // e.g. MATH, ENG
    },

    grade: {
      type: String,
      required: true // Grade 9–12
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null
    },

    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);