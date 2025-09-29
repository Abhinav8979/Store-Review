import prisma from "../prismaClient.js";

export const getUserController = async (req, res) => {
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
};
export const getAllUserController = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        address: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
