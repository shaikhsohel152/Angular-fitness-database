import express from "express";

import {
 getAllUsers,
 postUser,
 updateUser,
 deleteUser,
 loginUser   // ✅ login controller add
} from "../Controllers/userControllers.js";

const router = express.Router(); 

// GET ALL USERS
router.get("/", getAllUsers);

// REGISTER USER
router.post("/", postUser);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;