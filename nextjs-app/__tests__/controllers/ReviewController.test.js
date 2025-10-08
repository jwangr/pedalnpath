import ValidationError from "@/lib/utils/validation/ValidationError";
import mockReviewDao from "../dao/mockReviewDao";
import ReviewController from "@/lib/controllers/ReviewController";

// mock external functions
jest.mock("../../src/lib/dao/ReviewDao.js", () => ({
  __esModule: true,
  default: mockReviewDao,
}));

describe("Review controller", () => {
  let controller;
  let mockedonePathAllReviewsResponse = [{ id: 1 }, { id: 2 }, { id: 3 }];
  let mockedAllPathsAllReviewsResponse = [{ id: 4 }, { id: 5 }, { id: 6 }];
  let mockedonePathStats = [{ rating: 5, comments: 5 }];

  beforeEach(() => {
    jest.clearAllMocks();

    // set mock dao function return values
    mockReviewDao.onePathAllReviews = jest
      .fn()
      .mockResolvedValue(mockedonePathAllReviewsResponse);

    mockReviewDao.allPathsAllReviews = jest
      .fn()
      .mockResolvedValue(mockedAllPathsAllReviewsResponse);

    mockReviewDao.onePathStats = jest
      .fn()
      .mockResolvedValue(mockedonePathStats);

    mockReviewDao.createNewReview = jest.fn().mockResolvedValue({
      id: 10,
      score: 5,
      comment: "Great path!",
      userId: 1,
      bikepathId: 1,
    });

    mockReviewDao.updateReview = jest.fn().mockResolvedValue({
      id: 10,
      score: 4,
      comment: "Updated comment",
      userId: 1,
      bikepathId: 1,
    });

    mockReviewDao.deleteReview = jest.fn().mockResolvedValue({ success: true });

    mockReviewDao.onePathOneReview = jest.fn().mockResolvedValue({ userId: 5 });

    // create controller
    controller = new ReviewController(mockReviewDao);
  });

  it("retrieves all reviews for one path", async () => {
    const result = await controller.onePathAllReviews(1);
    expect(mockReviewDao.onePathAllReviews).toHaveBeenCalledWith(1);
    console.log(result);
  });
  it("retrieving all reviews for one path throws an error for invalid bikepathId", async () => {
    const invalidCases = [0, null, -1, "Invalid"];
    for (const bikepathId of invalidCases) {
      await expect(controller.onePathAllReviews(bikepathId)).rejects.toThrow(
        ValidationError
      );
      await expect(controller.onePathAllReviews(bikepathId)).rejects.toThrow(
        "bikepathId must be a positive integer"
      );
    }
  });
  it("retrieves all reviews with all paths", async () => {
    const mockReq = {
      url: "http://localhost/api/reviews?limit=5&userId=1",
    };
    const result = await controller.allPathsAllReviews(mockReq);
    expect(mockReviewDao.allPathsAllReviews).toHaveBeenCalledWith(5, 1);
    expect(result).toEqual(mockedAllPathsAllReviewsResponse);
  });
  it("retrieving all reviews with all paths throws an error with invalid limit or invalid userId", async () => {
    const invalidCases = [
      "limit=-5&userId=1",
      "limit=5&userId=-1",
      "limit=invalid&userId=invalid",
    ];
    for (const invalidParams of invalidCases) {
      const mockReq = {
        url: `http://localhost/api/reviews?${invalidParams}`,
      };
      await expect(controller.allPathsAllReviews(mockReq)).rejects.toThrow(
        ValidationError
      );
      await expect(controller.allPathsAllReviews(mockReq)).rejects.toThrow(
        "Input valid limit and valid userId"
      );
    }
  });
  it("gets review stats for one path", async () => {
    const result = await controller.getStats(1);
    expect(mockReviewDao.onePathStats).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockedonePathStats);
  });
  it("creates a new review", async () => {
    const result = await controller.createReview(5, "Great path!", 1, 1);

    expect(mockReviewDao.createNewReview).toHaveBeenCalledWith(
      5,
      "Great path!",
      1,
      1
    );
    expect(result).toEqual({
      id: 10,
      score: 5,
      comment: "Great path!",
      userId: 1,
      bikepathId: 1,
    });
  });
  it("throws error if invalid score, userId or bikepathId when creating review", async () => {
    const invalidCases = [
      // Invalid bikepathId
      { bikepathId: -1, comment: "Great path!", userId: 1, score: 3 },
      { bikepathId: 0, comment: "Nice!", userId: 2, score: 4 },

      // Invalid userId
      { bikepathId: 5, comment: "Good path", userId: -1, score: 3 },
      { bikepathId: 5, comment: "Good path", userId: 0, score: 3 },

      // Invalid score
      { bikepathId: 5, comment: "Good path", userId: 1, score: -1 },
      { bikepathId: 5, comment: "Good path", userId: 1, score: 6 }, // Assuming max is 5
    ];

    for (const testCase of invalidCases) {
      await expect(
        controller.createReview(
          testCase.score,
          testCase.comment,
          testCase.userId,
          testCase.bikepathId
        )
      ).rejects.toThrow(ValidationError);
    }
  });
  it("updates an existing review", async () => {
    const updatedReview = { score: 4, comment: "Updated comment" };
    const result = await controller.updateReview(10, updatedReview);

    expect(mockReviewDao.updateReview).toHaveBeenCalledWith(10, updatedReview);
    expect(result).toEqual({
      id: 10,
      score: 4,
      comment: "Updated comment",
      userId: 1,
      bikepathId: 1,
    });
  });
  it("throws an error if updating review with invalid score or reviewId", async () => {
    const invalidCases = [
      // Invalid reviewId
      {
        reviewId: -1,
        review: { score: 3 },
        errorMsg: "reviewId must be a positive integer",
      },
      {
        reviewId: 0,
        review: { score: 3 },
        errorMsg: "reviewId must be a positive integer",
      },
      {
        reviewId: 1.5,
        review: { score: 3 },
        errorMsg: "reviewId must be a positive integer",
      },

      // Invalid score
      { reviewId: 1, review: { score: -1 }, errorMsg: "Invalid score" },
      { reviewId: 1, review: { score: 6 }, errorMsg: "Invalid score" },
      { reviewId: 1, review: { score: "abc" }, errorMsg: "Invalid score" },
      { reviewId: 1, review: { score: null }, errorMsg: "Invalid score" },
      { reviewId: 1, review: { score: undefined }, errorMsg: "Invalid score" },
    ];
    for (const testCase of invalidCases) {
      await expect(
        controller.updateReview(testCase.reviewId, testCase.review)
      ).rejects.toThrow(ValidationError);
    }
  });
  it("deletes a review when user is the author", async () => {
    const result = await controller.deleteReview(5, 10);

    expect(mockReviewDao.onePathOneReview).toHaveBeenCalledWith(10);
    expect(mockReviewDao.deleteReview).toHaveBeenCalledWith(10);
    expect(result).toEqual({ success: true });
  });
  it("throws an error if deleting review that doesn't exist", async () => {
    mockReviewDao.onePathOneReview = jest.fn().mockResolvedValue([]);
    await expect(controller.deleteReview(1, 2)).rejects.toThrow(
      ValidationError
    );
    await expect(controller.deleteReview(1, 2)).rejects.toThrow(
      "Review not found"
    );
  });
  it("throws an error if non-author tries deleting review", async () => {
    mockReviewDao.onePathOneReview = jest.fn().mockResolvedValue([
      {
        id: 2,
        userId: 2,
      },
    ]);
    await expect(controller.deleteReview(1, 2)).rejects.toThrow(
      "Only the author can delete this review"
    );
  });
});
