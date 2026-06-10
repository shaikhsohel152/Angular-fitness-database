import OTP from "../models/Otp.js";
import User from "../models/userSchema.js";
import { transporter } from "../services/brevoService.js";

// ================= SEND OTP =================
transporter.sendMail({
  from: process.env.BREVO_LOGIN,
  to: email,
  subject: "GYMGEARPRO OTP Verification",
  html: `
    <h1>GYMGEARPRO</h1>
    <p>Your OTP is: <b>${otp}</b></p>
  `
})
.then(info => {
  console.log("📧 OTP Email Sent:", info);
})
.catch(err => {
  console.error("❌ Email Failed:", err);
});
// ================= VERIFY OTP (🔥 FIXED) =================
export const verifyOtp = async (req, res) => {
  try {

    const { name, email, otp } = req.body;

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.json({
        success: false,
        message: "OTP Expired"
      });
    }

    if (otpData.otp.toString() !== otp.toString()) {
      return res.json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // delete OTP after success
    await OTP.deleteMany({ email });

    // 🔥 CREATE OR UPDATE USER (MAIN FIX)
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
      });
    } else {
      user.name = name || user.name;
      await user.save();
    }

    return res.json({
      success: true,
      message: "OTP Verified Successfully",
      user
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Server Error"
    });
  }
};