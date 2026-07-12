const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      unique: true,
    },
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

    stream: {
      type: String,
      enum: ["Natural", "Social", "General"],
      default: "General",
    },
subjects:[
 {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Subject"
 }
],
    academicYear: {
      type: String,
      default: "2026",
    },

    homeroomTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

  },
  { timestamps: true },
);

module.exports = mongoose.model("Class", classSchema);
