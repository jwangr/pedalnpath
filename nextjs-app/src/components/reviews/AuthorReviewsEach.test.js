import { useDeleteReviewMutation } from "@/services/reviews";

jest.mock("@/services/reviews", () => ({
  useDeleteReviewMutation: jest.fn(),
}));

// mock component
jest.mock("./EditReviewModal", () => () => {
  return <div>Edit modal</div>;
});

import AuthorReviewsEach from "./AuthorReviewsEach";
import { renderWithTheme } from "@/test/test-utils";
import { screen } from "@testing-library/react";

let review = {
  id: 1,
  score: 5,
  comment: "Not bad, doable",
  userId: 4,
  bikepathId: 19,
  createdAt: "2025-09-23T23:23:24.420Z",
  user: { id: 4, email: "hulu@example.com" },
};

let userId = 3;
let mockDeleteReview = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockDeleteReview.mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({
      deleted: true,
    }),
  });
  useDeleteReviewMutation.mockReturnValue([
    mockDeleteReview,
    {
      data: { deleted: true },
      error: null,
      isLoading: false,
      isError: false,
    },
  ]);
});

it("Displays ratings and comments of a review", () => {
  renderWithTheme(<AuthorReviewsEach review={review} userId={userId} />);
  expect(screen.getByText("H")).toBeInTheDocument();
  expect(screen.getByText("hulu@example.com")).toBeInTheDocument();
  expect(screen.getByText("24/09/2025, 9:23:24 am")).toBeInTheDocument();
  const rating = screen.getByLabelText("5 Stars");
  expect(rating).toBeInTheDocument();
  expect(screen.getByText("Not bad, doable")).toBeInTheDocument();
});

it("displays the edit or delete buttons when userId matches to review author", () => {
  renderWithTheme(
    <AuthorReviewsEach review={review} userId={review.user.id} />
  );
  expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  expect(screen.getByText("Edit modal")).toBeInTheDocument();
});
