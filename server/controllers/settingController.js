const Setting = require("../models/Setting");

// GET SETTINGS
exports.getSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();

    if (!setting) {
      setting = await Setting.create({});
    }

    res.json(setting);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE SETTINGS

exports.updateSettings = async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate({}, req.body, {
      returnDocument : "after",
      upsert: true,
    });

    res.json({
      message: "Settings updated successfully",
      setting,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
