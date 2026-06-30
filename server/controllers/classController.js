const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher=require("../models/Teacher")
exports.createClass = async (req, res) => {
  try {

    const newClass = await Class.create(req.body);

    res.status(201).json({
      message: "Class created successfully",
      data: newClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 📄 Get All Classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("classTeacher", "firstName lastName")
      .populate("students", "firstName lastName");

    res.json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔍 Get Single Class
exports.getClassById = async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id)
      .populate("classTeacher", "firstName lastName")
      .populate("students", "firstName lastName");

    if (!singleClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(singleClass);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ✏️ Update Class
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ❌ Delete Class
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.json({
      message: "Class deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// ➕ Assign student to class
exports.assignStudentToClass = async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    const foundClass = await Class.findById(classId);
    const student = await Student.findById(studentId);

    if (!foundClass || !student) {
      return res.status(404).json({
        message: "Class or Student not found",
      });
    }

    // prevent duplicates
    if (foundClass.students.includes(studentId)) {
      return res.status(400).json({
        message: "Student already assigned to this class",
      });
    }

    foundClass.students.push(studentId);
    await foundClass.save();

    res.json({
      message: "Student assigned to class successfully",
      data: foundClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.assignTeacherToClass = async (req, res) => {
  try {
    const { classId, teacherId } = req.body;

    const foundClass = await Class.findById(classId);
    const teacher = await Teacher.findById(teacherId);

    if (!foundClass || !teacher) {
      return res.status(404).json({
        message: "Class or Teacher not found",
      });
    }

    foundClass.classTeacher = teacherId;
    await foundClass.save();

    res.json({
      message: "Teacher assigned to class successfully",
      data: foundClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getClassWithDetails = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate("classTeacher", "firstName lastName email")
      .populate("students", "firstName lastName email");

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.json(classData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
exports.getTeacherClasses = async (req, res) => {
  try {
    const teacherId = req.user.id; // from JWT

    const classes = await Class.find({
      classTeacher: teacherId,
    });

    res.json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
};