const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    email: {
      type: String
    },

    subjects: {
      type: [String], // multiple subjects
      default: []
    },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

    status: {
      type: String,
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);