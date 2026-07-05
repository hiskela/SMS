const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  deleteTeacher,
} = require("../controllers/teacherController");

// CREATE
router.post("/add", createTeacher);

// READ
router.get("/", getTeachers);

// DELETE
router.delete("/:id", deleteTeacher);
module.exports = router;