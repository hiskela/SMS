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
stream: {
  type: String,
  enum: ["Natural", "Social", "General"],
  default: "General",
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
user:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

    status: {
      type: String,
      default: "Active",
    },
  },
{strictPopulate: false},
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);