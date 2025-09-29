import bcrypt from "bcrypt";

import prisma from "../prismaClient.js";

export const createNewUserController = async (req, res) => {
  try {
    const { name, email, password, address, tab } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let finalRole = "STORE_OWNER";
    if (tab === "USER") {
      finalRole = "USER";
    } else if (tab === "SYSTEM_ADMINISTRATOR") {
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
    const { storeName, storeAddress, ownerEmail } = req.body;

    const existingStore = await prisma.store.findUnique({
      where: { address: storeAddress },
    });

    if (existingStore) {
      return res.status(400).json({ message: "Store already exists" });
    }

    let owner = await prisma.user.findUnique({ where: { email: ownerEmail } });

    if (!owner) {
      return res.status(400).json({
        message: "Owner does not exist. make sure the owner email is correct",
      });
    } else {
      if (owner.role !== "STORE_OWNER") {
        owner = await prisma.user.update({
          where: { id: owner.id },
          data: { role: "STORE_OWNER" },
        });
      }
    }

    const store = await prisma.store.create({
      data: {
        name: storeName,
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
