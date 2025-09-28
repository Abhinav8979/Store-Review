import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStoreController = async (req, res) => {
  try {
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

      return {
        id: store.id,
        name: store.name,
        owner: store.owner,
        overallRating: avgRating,
        totalRatings,
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
    const { ownerId } = req.query;

    const stores = await prisma.store.findMany({
      include: {
        ratings: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
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

      let responseStore = {
        id: store.id,
        name: store.name,
        owner: store.owner,
        overallRating: avgRating,
        totalRatings,
      };

      if (ownerId && store.ownerId === Number(ownerId)) {
        responseStore = {
          ...responseStore,
          detailedRatings: store.ratings.map((r) => ({
            user: r.user,
            rating: r.rating,
            comment: r.comment,
          })),
        };
      }

      return responseStore;
    });

    res.json({ stores: storeData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
