const express = require("express");
const router = express.Router();

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
} = require("../controllers/classController");

router.post("/", createClass);
router.post("/assign-student", assignStudentToClass);
router.post("/assign-teacher", assignTeacherToClass)
router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.get("/details/:id", getClassWithDetails);
module.exports = router;