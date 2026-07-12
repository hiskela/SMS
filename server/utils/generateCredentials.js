const crypto = require("crypto");

/**
 * Generate a secure temporary password
 */
function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);

    password += chars[randomIndex];
  }

  return password;
}

/**
 * Generate random code
 */
function generateRandomCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);

    code += chars[randomIndex];
  }

  return code;
}

/**
 * Student username
 * Example:
 * STU-2026-A82K91
 */
function generateStudentUsername() {
  const year = new Date().getFullYear();

  const random = generateRandomCode(6);

  return `STU-${year}-${random}`;
}

/**
 * Teacher username
 * Example:
 * TCH-2026-P92LM4
 */
function generateTeacherUsername() {
  const year = new Date().getFullYear();

  const random = generateRandomCode(6);

  return `TCH-${year}-${random}`;
}

module.exports = {
  generatePassword,
  generateStudentUsername,
  generateTeacherUsername,
};
