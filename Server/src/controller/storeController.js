import prisma from "../prismaClient.js";

export const getAllStoreController = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const stores = await prisma.store.findMany({
      include: {
        ratings: true,
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const storeData = stores.map((store) => {
      const totalRatings = store.ratings.length;
      const avgRating =
        totalRatings > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : 0;

      const userRating =
        userId && store.ratings.length > 0
          ? store.ratings.find((r) => r.userId === userId)?.rating || null
          : null;

      return {
        id: store.id,
        name: store.name,
        owner: store.owner,
        address: store.address,
        overallRating: avgRating,
        totalRatings,
        userRating,
      };
    });

    res.json({ stores: storeData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getOwnerStoreController = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const store = await prisma.store.findFirst({
      where: { ownerId },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!store) {
      return res.status(404).json({ error: "No store found for this owner" });
    }

    const ratings = await prisma.rating.findMany({
      where: { storeId: store.id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const totalRatings = ratings.length;
    const avgRating =
      totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    const response = {
      id: store.id,
      name: store.name,
      address: store.address,
      owner: store.owner,
      overallRating: avgRating,
      totalRatings,
      ratings: ratings.map((r) => ({
        userName: r.user.name,
        email: r.user.email,
        rating: r.rating,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
