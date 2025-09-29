import express from "express";
import { ratingController } from "../controller/ratingController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRole(["USER", "STORE_OWNER"]),
  ratingController
);

export default router;
