const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("teacher")
      .populate("student");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE MY PROFILE
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "teacher") {
      const teacher = await Teacher.findById(user.teacher);

      teacher.firstName = req.body.firstName;
      teacher.lastName = req.body.lastName;
      teacher.email = req.body.email;
      teacher.phone = req.body.phone;
      teacher.address = req.body.address;

      await teacher.save();
    }

    if (user.role === "student") {
      const student = await Student.findById(user.student);

      student.email = req.body.email;
      student.phone = req.body.phone;
      student.address = req.body.address;

      await student.save();
    }

    res.json({
      message: "Profile updated successfully.",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};