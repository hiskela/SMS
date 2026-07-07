const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    assignedClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },

    phone: {
      type: String,
      required: true,
    },
class: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Class",
  default: null,
},
    familyPhone: {
      type: String,
      required: true,
    },
email: {
  type: String,
  required: true,
unique: true
},
    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);