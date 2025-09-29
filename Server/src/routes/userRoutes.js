import express from "express";

import {
  getUserController,
  getAllUserController,
} from "../controller/userController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRole(["USER"]), getUserController);
router.get(
  "/get-all-users",
  authenticateToken,
  authorizeRole(["SYSTEM_ADMINISTRATOR"]),
  getAllUserController
);

export default router;
