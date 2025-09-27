import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get all users (with filters)
router.get("/", async (req, res) => {
  const { name, email, address, role } = req.query;
  const users = await prisma.user.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      email: email ? { contains: email, mode: "insensitive" } : undefined,
      address: address ? { contains: address, mode: "insensitive" } : undefined,
      role: role || undefined,
    },
    include: { store: true, ratings: true },
  });
  res.json(users);
});

// Add new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password, address, role },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
