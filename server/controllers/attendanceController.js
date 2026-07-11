
const Attendance = require("../models/Attendance");
const TeachingAssignment = require("../models/TeachingAssignment");
const Student = require("../models/Student");

// SAVE ATTENDANCE


exports.createAttendance = async (req, res) => {
  try {
    const { assignmentId, records } = req.body;

    if (!assignmentId) {
      return res.status(400).json({
        message: "Assignment ID is required.",
      });
    }

    if (!records || records.length === 0) {
      return res.status(400).json({
        message: "No attendance records provided.",
      });
    }

    const assignment = await TeachingAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Teaching assignment not found.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Remove today's attendance for this assignment
  const existingAttendance = await Attendance.findOne({
  teacher: assignment.teacher,
  subject: assignment.subject,
  class: assignment.class,
  date: {
    $gte: today,
  },
});

if (existingAttendance && !req.body.confirmUpdate) {
  return res.status(409).json({
    message: "Attendance already exists for today.",
    requireConfirmation: true,
  });
}
if (existingAttendance && req.body.confirmUpdate) {
  await Attendance.deleteMany({
    teacher: assignment.teacher,
    subject: assignment.subject,
    class: assignment.class,
    date: {
      $gte: today,
    },
  });
}
    const attendanceToSave = records.map((record) => ({
      student: record.student,
      status: record.status,
      teacher: assignment.teacher,
      class: assignment.class,
      subject: assignment.subject,
      date: today,
    }));

    const saved = await Attendance.insertMany(attendanceToSave);

    res.status(201).json({
      message: "Attendance saved successfully.",
      attendance: saved,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await TeachingAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      teacher: assignment.teacher,
      class: assignment.class,
      subject: assignment.subject,
      date: {
        $gte: today,
      },
    });

    res.json(attendance);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAttendanceHistory = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await TeachingAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Teaching assignment not found.",
      });
    }

    const attendance = await Attendance.find({
      teacher: assignment.teacher,
      class: assignment.class,
      subject: assignment.subject,
    })
      .populate("student", "firstName lastName")
      .sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getStudentsForAttendance = async (req, res) => {

  try {

    const assignmentId = req.params.assignmentId;


    const assignment = await TeachingAssignment.findById(
      assignmentId
    )
    .populate("class")
    .populate("subject");


    if (!assignment) {

      return res.status(404).json({
        message: "Assignment not found"
      });

    }


    const students = await Student.find({
      assignedClass: assignment.class._id
    });


    res.json({

      assignment,
      students

    });


  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// GET ATTENDANCE BY CLASS AND SUBJECT

exports.getAttendance = async (req, res) => {

  try {

    const { classId, subjectId, date } = req.params;


    const attendance = await Attendance.find({

      class: classId,

      subject: subjectId,

      date: {
        $gte: new Date(date),
      },

    })
    .populate(
      "student",
      "firstName lastName"
    );


    res.json(attendance);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};


// GET STUDENT ATTENDANCE HISTORY

exports.getStudentAttendance = async (req, res) => {

  try {

    const attendance = await Attendance.find({

      student: req.params.studentId,

    })
    .populate("subject")
    .populate("teacher")
    .sort({
      date: -1,
    });


    res.json(attendance);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { assignmentId, date } = req.params;

    const assignment = await TeachingAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Teaching assignment not found.",
      });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const attendance = await Attendance.find({
      teacher: assignment.teacher,
      class: assignment.class,
      subject: assignment.subject,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).populate(
      "student",
      "studentId firstName lastName gender"
    );

    res.json(attendance);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};