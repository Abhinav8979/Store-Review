import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  loginController,
  restPasswordController,
  signupController,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/reset-password", authenticateToken, restPasswordController);

export default router;
