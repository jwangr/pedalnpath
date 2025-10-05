import { render, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";
import PathsItem from "./PathsItem";
import {
  useGetUserPathsQuery,
  useToggleAddDeleteMutation,
} from "@/services/userPaths";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { useGetOverallStatsQuery } from "@/services/reviews";

jest.mock("@/services/userPaths", () => ({
  useGetUserPathsQuery: jest.fn(),
  useToggleAddDeleteMutation: jest.fn(),
}));

jest.mock("@/services/bikePaths", () => ({ useGetBikePathsQuery: jest.fn() }));
jest.mock("@/services/reviews", () => ({ useGetOverallStatsQuery: jest.fn() }));

describe("Paths Item", () => {

    // Mock return values of API calls
  beforeEach(() => {
    useGetUserPathsQuery.mockReturnValue({
      data: [{ id: 1, title: "Path 1" }],
      isLoading: false,
      error: null,
    });

    useGetBikePathsQuery.mockReturnValue({
      data: [{ id: 1, title: "Mocked Bike Path" }],
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });

    useToggleAddDeleteMutation.mockReturnValue([
      jest.fn(), // mock the trigger function
      {
        data: { added: true },
        isLoading: false,
        isSuccess: true,
        isError: false,
      },
    ]);

    useGetOverallStatsQuery.mockReturnValue({
      data: [{ count: 3, rating: { _avg: { score: 4 } } }],
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });
  });

  it("renders path description (title, distance, description", () => {
    renderWithTheme(
      <PathsItem
        path={{
          title: "Title",
          distanceKm: 3,
          description: "Description",
          id: 3,
        }}
        userId={3}
        displayUserPathsToggle={true}
      />
    );
    screen.debug();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('3 km')).toBeInTheDocument();
  });
});
