import { render, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";
import PathsItem from "./PathsItem";
import {
  useGetUserPathsQuery,
  useToggleAddDeleteMutation,
  useToggleCompletedMutation,
} from "@/services/userPaths";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { useGetOverallStatsQuery } from "@/services/reviews";

jest.mock("@/services/userPaths", () => ({
  useGetUserPathsQuery: jest.fn(),
  useToggleAddDeleteMutation: jest.fn(),
  useToggleCompletedMutation: jest.fn(),
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

    useToggleCompletedMutation.mockReturnValue([
      jest.fn(), // mock the trigger function
      {
        data: { completed: true },
        isLoading: false,
        isSuccess: true,
        isError: false,
      },
    ]);

    useGetOverallStatsQuery.mockReturnValue({
      data: { count: 3, rating: { _avg: { score: 4 } } },
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
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("3 km")).toBeInTheDocument();
  });

  it("renders a switch to save path to profile", () => {
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
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(1);
    expect(screen.getByText("Add to My List")).toBeInTheDocument();
  });

  it("renders a switch to mark path as complete", () => {
    renderWithTheme(
      <PathsItem
        path={{
          title: "Title",
          distanceKm: 3,
          description: "Description",
          id: 3,
        }}
        userId={3}
        displayUserPathsToggle={false}
      />
    );
    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(1);
  });

  it("renders the overall review stats", () => {
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
    expect(
      screen.getByText((content, element) => content.includes("4.0"))
    ).toBeInTheDocument();

    expect(screen.getByText(3)).toBeInTheDocument();
  });
});
