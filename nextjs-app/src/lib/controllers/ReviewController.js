import ReviewDao from "../dao/ReviewDao";
import ValidationError from "../utils/validation/ValidationError";

export default class ReviewController {
  constructor(dao = new ReviewDao()) {
    this.dao = dao;
  }

  async onePathAllReviews(bikepathId) {
    if (!Number.isInteger(bikepathId) || bikepathId <= 0)
      throw new ValidationError("bikepathId must be a positive integer");
    return await this.dao.onePathAllReviews(bikepathId);
  }

  async allPathsAllReviews(req) {
    const { searchParams } = new URL(req.url);
    const limit_raw = searchParams?.get("limit");
    const userId_raw = searchParams?.get("userId");

    const limit_parsed = limit_raw === 'undefined' ? undefined : parseInt(limit_raw);
    const userId_parsed = userId_raw === 'undefined' ? undefined : parseInt(userId_raw);

    // Validate parsed values
    if (limit_parsed !== undefined && (!Number.isInteger(limit_parsed) || limit_parsed <= 0)) throw new ValidationError("Input valid limit and valid user ID")
    if (userId_parsed !== undefined && (!Number.isInteger(userId_parsed) || userId_parsed <= 0)) throw new ValidationError("Input valid limit and valid user ID")

    return await this.dao.allPathsAllReviews(limit_parsed, userId_parsed); // can accept 'undefined' values
  }

  async getStats(bikepathId) {
    if (!Number.isInteger(bikepathId) || bikepathId <= 0)
      throw new ValidationError("bikepathId must be a positive integer");
    return await this.dao.onePathStats(bikepathId);
  }

  async createReview(score, comment, userId, bikepathId) {
    if (!Number(score) || score < 0 || score > 5)
      throw new ValidationError("Invalid score");
    if (!Number.isInteger(bikepathId) || bikepathId <= 0)
      throw new ValidationError("bikepathId must be a positive integer");
    if (!Number.isInteger(userId) || userId <= 0)
      throw new ValidationError("userId must be a positive integer");

    return await this.dao.createNewReview(score, comment, userId, bikepathId);
  }

  async updateReview(reviewId, review) {
    if (!Number(review.score) || review.score < 0 || review.score > 5)
      throw new ValidationError("Invalid score");
    if (!Number.isInteger(reviewId) || reviewId <= 0)
      throw new ValidationError("reviewId must be a positive integer");
    return await this.dao.updateReview(reviewId, review);
  }

  async deleteReview(userId, reviewId) {
    const review = await this.dao.onePathOneReview(reviewId);
    if (review.length === 0) throw new ValidationError("Review not found.");
    if (userId !== review.userId) {
      throw new Error("Only the author can delete this review");
    }

    return await this.dao.deleteReview(reviewId);
  }
}
