const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: "My School",
    },

    logo: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    academicYear: {
      type: String,
      default: "2026",
    },

    semester: {
      type: String,
      default: "First Semester",
    },

    enableEmail: {
      type: Boolean,
      default: true,
    },

    enableSMS: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Setting", settingSchema);