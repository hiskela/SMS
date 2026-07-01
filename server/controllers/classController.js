const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// CREATE
const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
const getClassById = async (req, res) => {
  try {
    const data = await Class.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateClass = async (req, res) => {
  try {
    const data = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ASSIGN TEACHER
const assignTeacherToClass = async (req, res) => {
  try {
    const { classId, teacherId } = req.body;

    const foundClass = await Class.findById(classId);
    foundClass.classTeacher = teacherId;
    await foundClass.save();

    res.json(foundClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ASSIGN STUDENT
const assignStudentToClass = async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    const foundClass = await Class.findById(classId);

    foundClass.students.push(studentId);
    await foundClass.save();

    res.json(foundClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CLASS DETAILS
const getClassWithDetails = async (req, res) => {
  try {
    const data = await Class.findById(req.params.id)
      .populate("classTeacher")
      .populate("students");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TEACHER CLASSES
const getTeacherClasses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const classes = await Class.find({
      classTeacher: teacherId,
    });

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// IMPORTANT EXPORT (ONLY ONCE)
module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  assignTeacherToClass,
  assignStudentToClass,
  getClassWithDetails,
  getTeacherClasses,
};