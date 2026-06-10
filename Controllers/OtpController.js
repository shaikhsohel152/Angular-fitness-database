import OTP from "../models/Otp.js";
import User from "../models/userSchema.js";
import { transporter } from "../services/brevoService.js";

// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await OTP.deleteMany({ email });

    await OTP.create({ email, otp });

    // ⚡ RESPONSE FIRST (FAST UX FIX)
    res.json({
      success: true,
      message: "OTP sent successfully"
    });

    // 🔥 EMAIL SEND BACKGROUND (NON-BLOCKING)
    transporter.sendMail({
      from: '"GYMGEARPRO" <sohelshaikhastroworld@gmail.com>',
      to: email,
      subject: "GYMGEARPRO OTP Verification",
      html: `
        <div style="max-width:600px;margin:auto;padding:40px;background:#f8f5ef;text-align:center;font-family:Arial;border-radius:20px;">
          <h1 style="color:#c5a059;">GYMGEARPRO</h1>
          <p>Your OTP Code</p>
          <h2 style="font-size:42px;">${otp}</h2>
        </div>
      `
    }).then(info => {
      console.log("📧 OTP Email Sent:", info.response);
    }).catch(err => {
      console.error("❌ Email Failed:", err);
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Sending OTP" });
  }
};
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