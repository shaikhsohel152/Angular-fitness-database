import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP,
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASSWORD
  },

  requireTLS: true,

  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: false
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});