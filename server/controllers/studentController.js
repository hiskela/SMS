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
const existingStudent = await Student.findOne({
  firstName: req.body.firstName.trim(),
  lastName: req.body.lastName.trim(),
  email: req.body.email.trim().toLowerCase(),
});

if (existingStudent) {
  return res.status(400).json({
    message: "A student with the same first name, last name, and email already exists.",
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
const user=
await User.create({
  username,
  password: hashedPassword,
  role: "student",
  student: student._id,
});
   student.user = user._id;
await student.save(); // 5. response
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
exports.getUnassignedStudents = async (req, res) => {
  try {

    const students = await Student.find({
      assignedClass: null
    });

    res.json(students);

  } catch(err) {

    res.status(500).json({
      message: err.message
    });

  }
};
// GET ONE STUDENT
exports.getStudentById = async (req, res) => {
  try {
  const student = await Student.findById(req.params.id)
  .populate({
    path: "assignedClass",
    select: "name grade homeroomTeacher",
    populate: {
      path: "homeroomTeacher",
      select: "firstName lastName"
    }
  });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// UPDATE STUDENT
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student updated successfully",
      student,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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

exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      user: req.user.id,
    }).populate({
      path: "assignedClass",
      populate: {
        path: "classTeacher",
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};