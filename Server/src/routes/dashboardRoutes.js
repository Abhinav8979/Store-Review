import express from "express";
import { getStatsController } from "../controller/dashboardController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/stats",
  authorizeRole(["system administrator"]),
  authenticateToken,
  getStatsController
);

export default router;
