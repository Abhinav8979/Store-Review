import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createNewUserController = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Decide role based on input
    let finalRole = "STORE_OWNER"; // default
    if (role === "USER") {
      finalRole = "USER";
    } else if (role === "SYSTEM_ADMINISTRATOR") {
      finalRole = "ADMIN";
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
        role: finalRole,
      },
    });

    res
      .status(201)
      .json({ message: `${finalRole} created successfully`, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createNewStoreController = async (req, res) => {
  try {
    const {
      storeName,
      storeEmail,
      storeAddress,
      ownerName,
      ownerEmail,
      ownerPassword,
    } = req.body;

    // Check if store already exists
    const existingStore = await prisma.store.findUnique({
      where: { email: storeEmail },
    });
    if (existingStore) {
      return res.status(400).json({ message: "Store already exists" });
    }

    // Check if owner exists
    let owner = await prisma.user.findUnique({ where: { email: ownerEmail } });

    if (!owner) {
      // Create new owner if not exists
      const hashedPassword = await bcrypt.hash(ownerPassword, 10);
      owner = await prisma.user.create({
        data: {
          name: ownerName,
          email: ownerEmail,
          password: hashedPassword,
          address: storeAddress,
          role: "STORE_OWNER",
        },
      });
    } else {
      // If exists, update role
      if (owner.role !== "STORE_OWNER") {
        owner = await prisma.user.update({
          where: { id: owner.id },
          data: { role: "STORE_OWNER" },
        });
      }
    }

    // Create new store
    const store = await prisma.store.create({
      data: {
        name: storeName,
        email: storeEmail,
        address: storeAddress,
        ownerId: owner.id,
      },
    });

    res
      .status(201)
      .json({ message: "Store created successfully", store, owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
