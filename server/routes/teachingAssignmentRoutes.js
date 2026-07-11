const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware")
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  deleteAssignment,
  getTeacherAssignments,
  getClassAssignments,
  updateAssignment,
getMyTeachingAssignments,
} = require("../controllers/teachingAssignmentController");

router.post("/", createAssignment);
router.get("/", getAssignments);
router.get("/teacher/:teacherId", getTeacherAssignments);
router.get("/class/:classId", getClassAssignments);
router.get(
"/my-assignments",
authMiddleware,
getMyTeachingAssignments
);
router.get("/:id", getAssignmentById);


router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

module.exports = router;
