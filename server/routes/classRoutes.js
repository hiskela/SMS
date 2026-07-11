const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  assignStudentToClass,
  getClassWithDetails,
  getTeacherClasses,
  getMyClasses,
getTeachersForHomeroom,
  getMyStudents,
  moveStudentToClass,
  removeStudentFromClass,
assignHomeroomTeacher
} = require("../controllers/classController");

router.post("/", createClass);
router.post("/assign-student", assignStudentToClass);
router.get(
 "/teachers/homeroom",
 getTeachersForHomeroom
);
router.get("/", getAllClasses);
router.get("/my-students", authMiddleware, getMyStudents);
router.get("/my-classes", authMiddleware, getMyClasses);
router.put("/:studentId/move-student", moveStudentToClass);
router.get("/:id/details", getClassWithDetails);
router.put(
"/:id/assign-homeroom",
assignHomeroomTeacher
);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/remove-student", removeStudentFromClass);

module.exports = router;