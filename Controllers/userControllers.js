// ================= Controllers/userControllers.js =================

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

    let { name, email, phone, password, address } = req.body;

    // ✅ normalize email
    email = email.trim().toLowerCase();

    // ✅ check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // ✅ create user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      address
    });

    res.status(201).json({
      message: "User Added Successfully",
      user: newUser
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

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

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

    let { email, password } = req.body;

    // ✅ normalize
    email = email.trim().toLowerCase();
    password = password.trim();

    // ✅ find user
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // ✅ password check
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

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }

};