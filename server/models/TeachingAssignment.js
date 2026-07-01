const mongoose = require("mongoose");

const teachingAssignmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    academicYear: {
      type: String,
      default: "2025-2026",
    },

    semester: {
      type: String,
      enum: ["1", "2"],
      default: "1",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeachingAssignment", teachingAssignmentSchema);