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
  it("retrieves all reviews with all paths", async () => {
    const mockReq = {
      url: "http://localhost/api/reviews?limit=5&userId=1",
    };
    const result = await controller.allPathsAllReviews(mockReq);
    expect(mockReviewDao.allPathsAllReviews).toHaveBeenCalledWith(5, 1);
    expect(result).toEqual(mockedAllPathsAllReviewsResponse);
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
  it("deletes a review when user is the author", async () => {
    const result = await controller.deleteReview(5, 10);

    expect(mockReviewDao.onePathOneReview).toHaveBeenCalledWith(10);
    expect(mockReviewDao.deleteReview).toHaveBeenCalledWith(10);
    expect(result).toEqual({ success: true });
  });
});
