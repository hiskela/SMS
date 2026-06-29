const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCredentials = async (email, username, password) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your School Login Details",
    text: `Hello,

Your account has been created.

 ${username}
 ${password}

Please change your password after login.
`,
  });
};

module.exports = sendCredentials;