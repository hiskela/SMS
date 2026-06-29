const Class = require("../models/Class");

// CREATE CLASS
exports.createClass = async (req, res) => {
  try {
    const { grade, section } = req.body;

    const className = `${grade}${section}`;

    const newClass = new Class({
      name: className,
      grade,
      section
    });

    const saved = await newClass.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL CLASSES
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CLASS
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};