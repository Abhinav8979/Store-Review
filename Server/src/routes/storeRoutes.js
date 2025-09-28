import express from "express";
import {
  getAllStoreController,
  getOwnerStoreController,
} from "../controller/storeController";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = express.Router();

router.get(
  "/public",
  authorizeRole(["user"]),
  authenticateToken,
  getAllStoreController
);

router.get(
  "/store-owner",
  authorizeRole(["storeOwner"]),
  authenticateToken,
  getOwnerStoreController
);

export default router;
