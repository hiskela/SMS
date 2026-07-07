const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
getTeacherById,
updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

// CREATE
router.post("/add", createTeacher);

// READ
router.get("/", getTeachers);
router.get("/:id", getTeacherById);

router.put("/:id", updateTeacher);
// DELETE
router.delete("/:id", deleteTeacher);
module.exports = router;