import express from "express";
import {
  getAllStoreController,
  getOwnerStoreController,
} from "../controller/storeController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/public",
  authenticateToken,
  authorizeRole(["USER", "SYSTEM_ADMINISTRATOR"]),
  getAllStoreController
);

router.get(
  "/store-owner",
  authenticateToken,
  authorizeRole(["STORE_OWNER"]),
  getOwnerStoreController
);

export default router;
