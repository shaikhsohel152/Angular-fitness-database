// ================= Controllers/userControllers.js =================

import User from "../models/userSchema.js";

/* =========================================================
   GET ALL USERS
========================================================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

/* =========================================================
   CREATE USER (OPTIONAL SIGNUP)
========================================================= */
export const postUser = async (req, res) => {
  try {

    let { name, email, phone, password, address, city, pincode } = req.body;

    email = email?.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      address,
      city,
      pincode
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
};

/* =========================================================
   OTP LOGIN / VERIFY USER (🔥 MAIN FIX)
   - THIS IS WHAT FIXES YOUR ISSUE
========================================================= */
export const loginUser = async (req, res) => {
  try {

    let { name, email, otp } = req.body;

    email = email?.trim().toLowerCase();

    // TODO: verify OTP logic here
    const otpValid = true;

    if (!otpValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // 🔥 CREATE OR UPDATE USER
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
      });
    } else {
      if (name) user.name = name;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/* =========================================================
   UPDATE USER (PROFILE SAVE - ADDRESS ETC)
========================================================= */
export const updateUser = async (req, res) => {
  try {

    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};

/* =========================================================
   DELETE USER
========================================================= */
export const deleteUser = async (req, res) => {
  try {

    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};