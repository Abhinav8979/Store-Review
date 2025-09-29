import express from "express";

import {
  createNewStoreController,
  createNewUserController,
} from "../controller/createController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create-user",
  authenticateToken,
  authorizeRole(["SYSTEM_ADMINISTRATOR"]),
  createNewUserController
);

router.post(
  "/create-store",
  authenticateToken,
  authorizeRole(["SYSTEM_ADMINISTRATOR"]),
  createNewStoreController
);

export default router;
