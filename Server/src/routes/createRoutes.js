import express from "express";

import {
  createNewStoreController,
  createNewUserController,
} from "../controller/createController";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = express.Router();

router.post(
  "/create-user",
  authorizeRole(["system administrator"]),
  authenticateToken,
  createNewUserController
);

router.post(
  "/create-store",
  authorizeRole(["system administrator"]),
  authenticateToken,
  createNewStoreController
);

export default router;
