const express = require("express");
const router = express.Router();

const {
  createClass,
  getClasses,
  deleteClass
} = require("../controllers/classController");

router.post("/add", createClass);
router.get("/", getClasses);
router.delete("/:id", deleteClass);

module.exports = router;