import { db } from "@/lib/db";

export default class ReviewDao {
  async onePathAllReviews(bikepathId) {
    return await db.review.findMany({
      where: {
        bikepathId,
      },
      include: {
        // user: true,
        user: {
          select: {
            email: true,
          },
        },
        bikepath: {
          select: {
            title: true
          }
        }
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }

  async onePathStats(bikepathId) {
    const count = await db.review.count({
      where: {
        bikepathId,
        comment: {
          not: null,
        },
      },
    });

    const rating = await db.review.aggregate({
      _avg: {
        score: true,
      },
      where: {
        bikepathId,
      },
    });

    return { count, rating };
  }

  async onePathOneReview(id) {
    return await db.review.findUnique({
      where: {
        id,
      },
    });
  }

  async allPathsAllReviews(limit) {
    return await db.review.findMany({
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
          bikepath: true,
        },
      },
    });
  }

  async createNewReview(score, comment, userId, bikepathId) {
    return await db.review.create({
      data: {
        score,
        comment,
        userId,
        bikepathId,
      },
    });
  }
  async deleteReview(id) {
    return await db.review.delete({
      where: {
        id,
      },
    });
  }
}
