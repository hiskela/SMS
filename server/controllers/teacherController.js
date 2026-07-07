const Teacher = require("../models/Teacher");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail=require('../utils/sendEmail');

const {
  generatePassword,
  generateTeacherUsername,
} = require("../utils/generateCredentials");

// CREATE TEACHER (same pattern as student)
const createTeacher = async (req, res) => {
  try {
    // 1. generate teacher ID (like studentId)
     const existingTeacher = await Teacher.findOne({
      email: req.body.email,
    });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
const teacherId = `TCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const teacher = await Teacher.create({
      ...req.body,
      teacherId,
    });

    // 3. generate login credentials (same idea as student)
    const teacherUsers = await User.countDocuments({ role: "teacher" });

    const username = generateTeacherUsername(teacherUsers);
    const plainPassword = generatePassword();

    // 4. hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 5. create user account (same as student logic)
   const user= await User.create({
      username,
      password: hashedPassword,
      role: "teacher",
      teacher: teacher._id,
    });
teacher.user = user._id;
await teacher.save();

   await sendEmail(
      teacher.email,
      "Teacher Login Credentials",
      `Welcome to the School Management System.

Your Teacher ID: ${teacherId}

Your Username: ${username}

Your Password: ${plainPassword}

Please change your password after your first login.`
    )
    // 6. response (same structure as student)
    res.status(201).json({
      message: "Teacher registered successfully",
      teacher,
      credentials: {
        username,
        password: plainPassword,
      },
    });

  } catch (error) {
    console.log("TEACHER ERROR:", error);
    res.status(500).json({
      message: "Failed to register teacher",
      error: error.message,
    });
  }
};
const deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  deleteTeacher,

};