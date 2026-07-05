const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("teacher")
      .populate("student");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile = {
      _id: user._id,
      username: user.username,
      role: user.role,
      email: user.email || "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };

    // TEACHER PROFILE
    if (user.role === "teacher" && user.teacher) {
      profile.firstName = user.teacher.firstName;
      profile.lastName = user.teacher.lastName;
      profile.email = user.teacher.email;
      profile.phone = user.teacher.phone;
      profile.address = user.teacher.address;
    }

    // STUDENT PROFILE
    if (user.role === "student" && user.student) {
      profile.firstName = user.student.firstName;
      profile.lastName = user.student.lastName;
      profile.email = user.student.email;
      profile.phone = user.student.phone;
      profile.address = user.student.address;
    }

    // ADMIN PROFILE (important)
    if (user.role === "admin") {
      profile.firstName = "Admin";
      profile.lastName = "User";
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
