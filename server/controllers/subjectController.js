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
const {name, code}=req.body;
const existing = await Subject.findOne({ name });
if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required.",
      });
    }

if (existing) {
  return res.status(400).json({
    message: "Subject  already exists."
  });
}
    const subjectId = await generateSubjectId();

    const subject = new Subject({
      ...req.body,
      subjectId,
    });

    const saved = await subject.save();

    res.status(201).json({
      message: "Subject created successfully",
      subject: saved,
    });

  } catch (err) {
    console.log("SUBJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SUBJECTS
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
 

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json(subject);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// DELETE SUBJECT
exports.deleteSubject = async (req, res) => {
  try {
   const subject= await Subject.findByIdAndDelete(req.params.id);
if (!subject) {
  return res.status(404).json({
    message: "Subject not found",
  });
}
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};