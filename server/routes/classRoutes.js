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
  assignTeacherToClass,
  getClassWithDetails,
  getTeacherClasses,
  getMyClasses,
  getMyStudents,
  moveStudentToClass,
removeStudentFromClass
} = require("../controllers/classController");

router.post("/", createClass);
router.post("/assign-student", assignStudentToClass);
router.post("/assign-teacher", assignTeacherToClass);
router.get("/", getAllClasses);
router.get("/my-classes", authMiddleware, getMyClasses);
router.get("/:id/details", getClassWithDetails);
router.put(
  "/move-student",
  moveStudentToClass
);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.put("/:id/assign-teacher", assignTeacherToClass);
router.get("/my-students", authMiddleware, getMyStudents);
router.delete("/:id", deleteClass);
router.post(
 "/remove-student",
 removeStudentFromClass
);
module.exports = router;
