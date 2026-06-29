const express = require("express");
const router = express.Router();

const {
  createSubject,
  getSubjects,
  deleteSubject
} = require("../controllers/subjectController");

router.post("/add", createSubject);
router.get("/", getSubjects);
router.delete("/:id", deleteSubject);

module.exports = router;