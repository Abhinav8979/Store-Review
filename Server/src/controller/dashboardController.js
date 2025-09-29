import prisma from "../prismaClient.js";

export const getStatsController = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
