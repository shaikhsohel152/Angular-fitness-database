import OTP from "../models/Otp.js";
import User from "../models/userSchema.js";
import { transporter } from "../services/brevoService.js";

// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp
    });

    // Fast response
    res.json({
      success: true,
      message: "OTP sent successfully"
    });

    // Background email
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

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Error Sending OTP"
    });
  }
};

// ================= VERIFY OTP =================
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

    await OTP.deleteMany({ email });

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