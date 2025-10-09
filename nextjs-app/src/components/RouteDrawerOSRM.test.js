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
import { mockBikePathDao } from "../../__tests__/dao/mockBikePathDao";

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
  let validator;
  let mockBikeRouteProp;
  let mockCreateRoute;

  beforeEach(() => {
    mockBikeRouteProp = {
      title: "fake bikeRoute",
      distanceKm: "fake distance",
      duration: "fake duration",
      suitableFor: ["A", "B", "C"],
      highlights: ["D", "E", "F"],
      description: "fake description",
    };

    mockCreateRoute = jest.fn().mockReturnValue({
      unwrap: jest
        .fn()
        .mockResolvedValue({
          title: "New route created",
          distanceKm: "fake distance",
          duration: "fake duration",
          suitableFor: ["A", "B", "C"],
          highlights: ["D", "E", "F"],
          description: "fake description",
        }),
    });
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
          distanceKm: "fake distance",
          duration: "fake duration",
          suitableFor: ["A", "B", "C"],
          highlights: ["D", "E", "F"],
          description: "fake description",
        }}
        userId={1}
      />
    );
    expect(useGetBikePathsQuery).toHaveBeenCalledWith({
      title: "fake bikeRoute",
    });
    expect(
      screen.getByRole("heading", { name: /fake bikeRoute/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("alert")).toHaveTextContent(
      /path found in database already/i
    );
    expect(
      screen.getByText(/fake distance\s*km/i, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("fake duration")).toBeInTheDocument();
    expect(screen.getByText("A, B, C")).toBeInTheDocument();
    expect(screen.getByText("D, E, F")).toBeInTheDocument();
    expect(screen.getByText("fake description")).toBeInTheDocument();
  });

  it("Should create a new global route if route doesn't exist in database. Then display route onto screen.", async () => {
    // mocks return values
    useGetBikePathsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetchBikePaths: jest.fn(),
    });

    // render component
    renderWithTheme(
      <RouteDrawerOSRM BikeRoute={mockBikeRouteProp} userId={1} />
    );

    // Assertions
    expect(mockCreateRoute).toHaveBeenCalledWith(mockBikeRouteProp);
    // { title: "New route created" }
        expect(useGetBikePathsQuery).toHaveBeenCalledWith({
      title: "fake bikeRoute",
    });
    expect(
      screen.getByRole("heading", { name: /fake bikeRoute/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("alert")).toHaveTextContent(
      /added new path to Pedal N' Path/i
    );
    expect(
      screen.getByText(/fake distance\s*km/i, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("fake duration")).toBeInTheDocument();
    expect(screen.getByText("A, B, C")).toBeInTheDocument();
    expect(screen.getByText("D, E, F")).toBeInTheDocument();
    expect(screen.getByText("fake description")).toBeInTheDocument();
  });
});
