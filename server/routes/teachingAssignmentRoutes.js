const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  deleteAssignment,
} = require("../controllers/teachingAssignmentController");

router.post("/", createAssignment);
router.get("/", getAssignments);
router.get("/:id", getAssignmentById);
router.delete("/:id", deleteAssignment);

module.exports = router;