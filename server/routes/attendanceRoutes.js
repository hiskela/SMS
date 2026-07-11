const express = require("express");
const auth=require("../middleware/authmiddleware")
const router = express.Router();

const {
  createAttendance,
  getAttendance,
  getStudentAttendance,
  getStudentsForAttendance,
  getAttendanceHistory,
  getTodayAttendance,
getAttendanceByDate} = require("../controllers/attendanceController");

router.post("/", createAttendance);

router.get("/students/:assignmentId", getStudentsForAttendance);
router.get("/today/:assignmentId", getTodayAttendance);
router.get("/history/:assignmentId", getAttendanceHistory);
router.get(
  "/teacher/:assignmentId/:date",
  auth,
  getAttendanceByDate
);
router.get("/:classId/:subjectId/:date", getAttendance);

router.get("/student/:studentId", getStudentAttendance);

module.exports = router;
