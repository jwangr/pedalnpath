import ReviewDao from "../dao/ReviewDao";

const dao = new ReviewDao();
export default class ReviewController {
  async onePathAllReviews(bikepathId) {
    // TO DO: validate id

    return await dao.onePathAllReviews(bikepathId);
  }

  async getStats(bikepathId) {
    return await dao.onePathStats(bikepathId);
  }

  async createReview(score, comment, userId, bikepathId) {
    // TO DO: validate rating, userid, pathid

    return await dao.createNewReview(score, comment, userId, bikepathId);
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
