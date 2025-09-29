import express from "express";
import { getStatsController } from "../controller/dashboardController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/stats",
  authenticateToken,
  authorizeRole(["SYSTEM_ADMINISTRATOR"]),
  getStatsController
);

export default router;
