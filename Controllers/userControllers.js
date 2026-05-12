import User from "../models/userSchema.js";

// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "All Users Fetched",
      users
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Users",
      error: error.message
    });
  }
};

// ================= CREATE USER (SIGNUP) =================
export const postUser = async (req, res) => {
  try {
    const data = req.body;

    const newUser = await User.create(data);

    res.status(201).json({
      message: "User Added Successfully",
      user: newUser   // ✅ FIXED (important)
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Adding User",
      error: error.message
    });
  }
};

// ================= UPDATE USER =================
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true
    });

    res.status(200).json({
      message: "User Updated",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Updating User",
      error: error.message
    });
  }
};

// ================= DELETE USER =================
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User Deleted",
      user: deletedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Deleting User",
      error: error.message
    });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    res.status(200).json({
      message: "Login Success",
      user: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};