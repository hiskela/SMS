const crypto = require("crypto");

function generatePassword(length = 8) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

function generateStudentUsername(studentCount) {
  return `STU${new Date().getFullYear()}${String(studentCount + 1).padStart(4, "0")}`;
}

function generateTeacherUsername(teacherCount) {
  return `TCH${new Date().getFullYear()}${String(teacherCount + 1).padStart(4, "0")}`;
}

module.exports = {
  generatePassword,
  generateStudentUsername,
  generateTeacherUsername,
};