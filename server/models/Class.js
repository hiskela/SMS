const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    grade: {
      type: Number,
      required: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    academicYear: {
      type: String,
      default: "2026",
    },

    homeroomTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);