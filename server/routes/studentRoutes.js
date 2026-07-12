const express = require("express");
const router = express.Router();
const auth=require("../middleware/authMiddleware")
const {
  createStudent,
  getStudents,
getStudentById,
updateStudent,
getMyProfile,
  deleteStudent,
getMySubjects
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/add", createStudent)
router.get(
  "/my-subjects",
  auth,
  getMySubjects
);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;