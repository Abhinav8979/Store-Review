import express from "express";
import { getStatsController } from "../controller/dashboardController";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = express.Router();

router.get(
  "/stats",
  authorizeRole(["system administrator"]),
  authenticateToken,
  getStatsController
);

export default router;
