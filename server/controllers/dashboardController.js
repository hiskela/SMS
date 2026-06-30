
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.getStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();

    res.json({
      students,
      teachers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};