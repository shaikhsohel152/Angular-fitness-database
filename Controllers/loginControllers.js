import User from "../models/userSchema.js";

export const loginUser = async (req, res) => {
  try {

    let { email, password } = req.body;

    // ✅ normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    // 🔍 find by email only first
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 🔐 password check separately
    if (user.password !== password) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    res.status(200).json({
      message: "Login Success",
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};