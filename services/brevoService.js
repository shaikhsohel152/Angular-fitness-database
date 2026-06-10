import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",

  // SMTP SSL Port
  port: 465,

  secure: true,

  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASSWORD
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});