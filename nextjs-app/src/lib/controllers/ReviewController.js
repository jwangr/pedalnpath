import ReviewDao from "../dao/ReviewDao";
import ValidationError from "../utils/validation/ValidationError";

const dao = new ReviewDao();
export default class ReviewController {
  async onePathAllReviews(bikepathId) {
    // TO DO: validate id

    return await dao.onePathAllReviews(bikepathId);
  }

  async allPathsAllReviews(req) {
    const { searchParams } = new URL(req.url);
    const limit_raw = searchParams?.get("limit");
    const userId_raw = searchParams?.get("userId");
    // TO DO: validate limit or userId

    const limit_parsed = limit_raw ? parseInt(limit_raw) : null;
    const userId_parsed = userId_raw ? parseInt(userId_raw) : null;

    return await dao.allPathsAllReviews(limit_parsed, userId_parsed);
  }

  async getStats(bikepathId) {
    return await dao.onePathStats(bikepathId);
  }

  async createReview(score, comment, userId, bikepathId) {
    // TO DO: validate rating, userid, pathid

    return await dao.createNewReview(score, comment, userId, bikepathId);
  }

  async updateReview(reviewId, review) {
    // TO DO: validate rating, userId, etc.

    return await dao.updateReview(reviewId, review);
  }

  async deleteReview(userId, reviewId) {
    // TO DO: make sure only user matching reviewId can make changes

    const review = await dao.onePathOneReview(reviewId);
    console.log(review);
    if (userId !== review.userId) {
      console.log("not the author uh oh");
      throw { status: 403, error: "Only the author can delete this review" };
    }

    return await dao.deleteReview(reviewId);
  }
}
