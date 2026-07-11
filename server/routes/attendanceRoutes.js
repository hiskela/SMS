const express = require("express");
const auth=require("../middleware/authmiddleware")
const router = express.Router();

const {
  createAttendance,
  
  getStudentAttendance,
  getStudentsForAttendance,
  getAttendanceHistory,
  getTodayAttendance,
getAttendanceSummary,
getAttendanceDetails,
} = require("../controllers/attendanceController");

router.post("/", createAttendance);

router.get("/students/:assignmentId", getStudentsForAttendance);
router.get("/today/:assignmentId", getTodayAttendance);
router.get("/history/:assignmentId", getAttendanceHistory);

router.get(
  "/summary/:assignmentId",
  auth,
  getAttendanceSummary
);
router.get(
  "/details/:assignmentId/:date",
  auth,
  getAttendanceDetails
);

router.get("/student/:studentId", getStudentAttendance);

module.exports = router;
