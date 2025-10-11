import { renderWithTheme } from "@/test/test-utils";
import { screen } from "@testing-library/react";

import { useGetUserQuery } from "@/services/Auth";
import { useGetReviewsQuery } from "@/services/reviews";

jest.mock("@/services/reviews.js", () => ({
  useGetReviewsQuery: jest.fn(),
}));

jest.mock("@/services/Auth.js", () => ({
  useGetUserQuery: jest.fn(),
}));

// mock components are made to return a mock function
jest.mock("./AuthorReviewsEach", () => () => {
  return <div>Each author's reviews</div>;
});
jest.mock("../loadingBikes/Shake", () => () => {
  return <div>Shaking bike</div>;
});

import AuthorReviewsContainer from "./AuthorReviewsContainer";

let bikePathId = 4;

beforeEach(() => {
  jest.clearAllMocks();
  useGetReviewsQuery.mockReturnValue({
    data: [{ id: 1 }, { id: 2 }],
    error: null,
    isLoading: false,
    isError: false,
  });

  useGetUserQuery.mockReturnValue({
    data: [{ id: 3 }],
    error: null,
    isLoading: false,
    isError: false,
  });
});

it("Displays the authors review container when 1+ reviews are successfully found", () => {
  renderWithTheme(<AuthorReviewsContainer bikePathId={bikePathId} />);
  expect(screen.getAllByText("Each author's reviews")).toHaveLength(2);
});

it("Displays a message when the author has made 0 reviews", () => {
  useGetReviewsQuery.mockReturnValue({
    data: [],
    error: null,
    isLoading: false,
    isError: false,
  });

  renderWithTheme(<AuthorReviewsContainer bikePathId={bikePathId} />);
  expect(
    screen.getByText("No reviews yet. Be the first explorer!")
  ).toBeInTheDocument();
});

it("Displays a loading message when reviews loading", () => {
  useGetReviewsQuery.mockReturnValue({
    data: null,
    error: null,
    isLoading: true,
    isError: false,
  });

  renderWithTheme(<AuthorReviewsContainer bikePathId={bikePathId} />);
  expect(screen.getByText("Loading reviews...")).toBeInTheDocument();
  expect(screen.getByText("Shaking bike")).toBeInTheDocument();
});

it("Displays an message when reviews cannot be fetched", () => {
  useGetReviewsQuery.mockReturnValue({
    data: null,
    error: { message: "Uh oh" },
    isLoading: false,
    isError: true,
  });

  renderWithTheme(<AuthorReviewsContainer bikePathId={bikePathId} />);
  expect(screen.getByText("Error loading reviews: Uh oh")).toBeInTheDocument();
});
