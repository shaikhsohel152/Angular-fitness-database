import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

console.log(process.env.BREVO_SMTP);

console.log(process.env.BREVO_PORT);

console.log(process.env.BREVO_LOGIN);

console.log(process.env.BREVO_PASSWORD);

export const transporter =
  nodemailer.createTransport({

    host: process.env.BREVO_SMTP,

    port: Number(process.env.BREVO_PORT),

    secure: false,

    auth: {

      user: process.env.BREVO_LOGIN,

      pass: process.env.BREVO_PASSWORD

    }

  });