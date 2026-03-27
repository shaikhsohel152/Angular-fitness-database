import express from "express";
import { loginUser } from "../Controllers/loginControllers.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;