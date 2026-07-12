const mongoose = require("mongoose");

const gradeSubjectSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
    },

    stream: {
      type: String,
      enum: [
        "Natural",
        "Social",
        "General"
      ],
      default: "General",
    },

    subjects:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    }],

    academicYear: {
      type: String,
      default: "2026",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GradeSubject",
  gradeSubjectSchema
);