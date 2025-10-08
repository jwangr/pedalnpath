import ReviewDao from "../dao/ReviewDao";
import ValidationError from "../utils/validation/ValidationError";

export default class ReviewController {
  constructor(dao = new ReviewDao()) {
    this.dao = dao;
  }

  async onePathAllReviews(bikepathId) {
    return await this.dao.onePathAllReviews(bikepathId);
  }

  async allPathsAllReviews(req) {
    const { searchParams } = new URL(req.url);
    const limit_raw = searchParams?.get("limit");
    const userId_raw = searchParams?.get("userId");

    const limit_parsed = limit_raw ? parseInt(limit_raw) : null;
    const userId_parsed = userId_raw ? parseInt(userId_raw) : null;

    return await this.dao.allPathsAllReviews(limit_parsed, userId_parsed);
  }

  async getStats(bikepathId) {
    return await this.dao.onePathStats(bikepathId);
  }

  async createReview(score, comment, userId, bikepathId) {
    return await this.dao.createNewReview(score, comment, userId, bikepathId);
  }

  async updateReview(reviewId, review) {
    // TO DO: validate rating, userId, etc.

    return await this.dao.updateReview(reviewId, review);
  }

  async deleteReview(userId, reviewId) {

    const review = await this.dao.onePathOneReview(reviewId);
    console.log(review);
    if (userId !== review.userId) {
      console.log("not the author uh oh");
      throw { status: 403, error: "Only the author can delete this review" };
    }

    return await this.dao.deleteReview(reviewId);
  }
}
