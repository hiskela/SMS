const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
getUnassignedStudents,
getStudentById,
updateStudent,
getMyProfile,
  deleteStudent
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/add", createStudent)
router.get("/unassigned", getUnassignedStudents);

router.get("/:id", getStudentById);
router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;