import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";

import {
  useCreateBikePathMutation,
  useGetBikePathsQuery,
} from "@/services/bikePaths";
import RouteDrawerOSRM from "./RouteDrawerOSRM";
import {
  useGetOverallStatsQuery,
  useGetReviewsQuery,
} from "@/services/reviews";
import { useGetUserQuery } from "@/services/Auth";

jest.mock("../../src/services/bikePaths.js", () => ({
  useCreateBikePathMutation: jest.fn(),
  useGetBikePathsQuery: jest.fn(),
}));
jest.mock("../../src/services/reviews.js", () => ({
  useGetOverallStatsQuery: jest.fn(),
  useGetReviewsQuery: jest.fn(),
}));
jest.mock("../../src/services/Auth.js", () => ({
  useGetUserQuery: jest.fn(),
}));

// mock external services
describe("Explore page route drawer", () => {
  beforeEach(() => {
    let validator;
    let mockCreateRoute = jest
      .fn()
      .mockReturnValue({ title: "New route created" });

    // mock query and mutation function return values
    useGetOverallStatsQuery.mockReturnValue({
      data: { count: 2, rating: { _avg: { score: 2 } } },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
    useGetReviewsQuery.mockReturnValue({
      data: [
        { title: "Got review 1" },
        { title: "Got review 2" },
        { title: "Got review 3" },
      ],
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    useGetBikePathsQuery.mockReturnValue({
      data: [{ title: "Found path in database" }],
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetchBikePaths: jest.fn(),
    });

    useCreateBikePathMutation.mockReturnValue([
      mockCreateRoute,
      {
        data: null,
        isLoading: false,
        isSuccess: true,
        isError: false,
      },
    ]);

    useGetUserQuery.mockReturnValue({
      data: { title: "get user query" },
      isError: false,
      isSuccess: true,
      isLoading: false,
    });
  });

  it("Should check if route exists in database and should display existing route onto screen", () => {
    renderWithTheme(
      <RouteDrawerOSRM
        BikeRoute={{
          title: "fake bikeRoute",
        }}
        userId={1}
      />
    );
    expect(useGetBikePathsQuery).toHaveBeenCalledWith({
      title: "fake bikeRoute",
    });

  });

  //   it("Should create a new global route if route doesn't exist in database");
  //   it("Should display newly created route onto screen");
});
