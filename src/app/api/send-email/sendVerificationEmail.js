const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendVerificationEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset password",
    text: `Use token: ${code} to reset your password directly on the website via the link provided below: http://localhost:3000/reset-password?token=${code}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso:", info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

export default sendVerificationEmail;