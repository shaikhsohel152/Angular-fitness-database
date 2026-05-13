// ================= Routes/userRoutes.js =================

import express from "express";

import {
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
  loginUser
} from "../Controllers/userControllers.js";

const router = express.Router();

// ================= GET ALL USERS =================
router.get("/", getAllUsers);

// ================= SIGNUP =================
router.post("/", postUser);

// ================= LOGIN =================
router.post("/login", loginUser);

// ================= UPDATE USER =================
router.put("/:id", updateUser);

// ================= DELETE USER =================
router.delete("/:id", deleteUser);

export default router;