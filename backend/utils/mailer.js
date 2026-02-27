const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Vishnu Builder" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendMail;