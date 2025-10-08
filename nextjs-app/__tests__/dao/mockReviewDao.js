const mockReviewDao = {
  onePathAllReviews: jest.fn(),
  onePathStats: jest.fn(),
  onePathOneReview: jest.fn(),
  allPathsAllReviews: jest.fn(),
  createNewReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
};

export default mockReviewDao;
