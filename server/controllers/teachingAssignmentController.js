const TeachingAssignment = require("../models/TeachingAssignment");

exports.createAssignment = async (req, res) => {
  try {
    const { teacher, subject, class: classId, academicYear, semester } = req.body;

    if (!teacher || !subject || !classId) {
      return res.status(400).json({
        message: "teacher, subject and class are required",
      });
    }

    const existing = await TeachingAssignment.findOne({
      teacher,
      subject,
      class: classId,
      academicYear,
      semester,
    });

    if (existing) {
      return res.status(400).json({
        message: "Assignment already exists",
      });
    }

    const assignment = await TeachingAssignment.create({
      teacher,
      subject,
      class: classId,
      academicYear,
      semester,
    });

    res.status(201).json({
      message: "Teaching assignment created",
      assignment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await TeachingAssignment.find()
      .populate("teacher")
      .populate("subject")
      .populate("class");

    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await TeachingAssignment.findById(req.params.id)
      .populate("teacher")
      .populate("subject")
      .populate("class");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json(assignment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.deleteAssignment = async (req, res) => {
  try {
    const deleted = await TeachingAssignment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json({
      message: "Assignment deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};