import prisma from "../prisma.js";

export const ratingController = async (req, res) => {
  try {
    const { userId, storeId, rating, comment } = req.body;

    if (!userId || !storeId || !rating) {
      return res
        .status(400)
        .json({ error: "userId, storeId, and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Check if user already rated this store
    const existingRating = await prisma.rating.findFirst({
      where: { userId, storeId },
    });

    let savedRating;

    if (existingRating) {
      // 🔹 Update rating
      savedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { rating, comment },
      });
    } else {
      // 🔹 Create new rating
      savedRating = await prisma.rating.create({
        data: {
          rating,
          comment,
          user: { connect: { id: userId } },
          store: { connect: { id: storeId } },
        },
      });
    }

    const agg = await prisma.rating.aggregate({
      where: { storeId },
      _avg: { rating: true },
    });

    await prisma.store.update({
      where: { id: storeId },
      data: { rating: agg._avg.rating || 0 },
    });

    res.json({
      message: existingRating
        ? "Rating updated successfully"
        : "Rating submitted successfully",
      rating: savedRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
