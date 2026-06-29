const Student = require("../models/Student");
const User=require("../models/User")
const bcrypt=require("bcrypt");
const sendEmail=require("../utils/sendEmail")

const {
  generatePassword,
  generateStudentUsername,
} = require("../utils/generateCredentials");

exports.createStudent = async (req, res) => {
  try {
    

    // 2. generate student ID
const studentId = `STU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const existing = await Student.findOne({ email: req.body.email });

if (existing) {
  return res.status(400).json({
    message: "Email already exists"
  });
}
    // 3. create student
    const student = await Student.create({
      ...req.body,
      studentId,
    });

    // 4. create login account
    const studentUsers = await User.countDocuments({ role: "student" });

    const username = generateStudentUsername(studentUsers);
    const plainPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(plainPassword, 10);


await sendEmail(
  student.email,
  "Your School Login Credentials",
  `Your Username: ${username}
Your Password: ${plainPassword}
Student ID: ${studentId}`
);

await User.create({
  username,
  password: hashedPassword,
  role: "student",
  student: student._id,
});
    // 5. response
    return res.status(201).json({
      message: "Student registered successfully",
      student,
      credentials: {
        username,
        password: plainPassword,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
// READ
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};