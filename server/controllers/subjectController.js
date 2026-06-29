const Subject = require("../models/Subject");

// Generate Subject ID like SUB20260001
const generateSubjectId = async () => {
  const year = new Date().getFullYear();

  const last = await Subject.findOne({})
    .sort({ createdAt: -1 })
    .select("subjectId");

  let number = 1;

  if (last && last.subjectId) {
    number = parseInt(last.subjectId.slice(-4)) + 1;
  }

  return `SUB${year}${String(number).padStart(4, "0")}`;
};

// CREATE SUBJECT
exports.createSubject = async (req, res) => {
  try {
    const subjectId = await generateSubjectId();

    const subject = new Subject({
      ...req.body,
      subjectId
    });

    const saved = await subject.save();

    res.status(201).json({
      message: "Subject created successfully",
      subject: saved
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SUBJECTS
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("teacher")
      .populate("classes");

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SUBJECT
exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};