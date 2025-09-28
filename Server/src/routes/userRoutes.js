import express from "express";

import { getUserController } from "../controller/userController.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authorizeRole(["user"]), authenticateToken, getUserController);

export default router;
