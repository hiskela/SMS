
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class=require("../models/Class")
const Subject=require("../models/Subject")

exports.getStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
const classes=await Class.countDocuments();
const subjects=await Subject.countDocuments();
    res.json({
      students,
      teachers,
classes,
subjects
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};