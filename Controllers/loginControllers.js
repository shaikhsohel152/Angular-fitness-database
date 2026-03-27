import User from "../models/userSchema.js";

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
      password: password
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};