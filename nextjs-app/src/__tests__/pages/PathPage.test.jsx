import { render, screen } from "@testing-library/react";
import PathPage from "@/app/path/[slug]/page";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { useParams } from "next/navigation";
import MainContent from "@/components/PathPageMainContents";

// Mock with relative paths
jest.mock("../../services/bikePaths", () => ({
  useGetBikePathsQuery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../components/PathPageMainContents", () =>
  jest.fn(() => <div>Mocked MainContent</div>)
);

describe("PathPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state while fetching data", () => {
    useParams.mockReturnValue({ slug: "test-path" });
    useGetBikePathsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isError: false,
    });

    render(<PathPage />);

    expect(MainContent).toHaveBeenCalledWith(
      { path: undefined, loading: true },
      undefined
    );
    expect(screen.getByText("Mocked MainContent")).toBeInTheDocument();
  });

  it("renders MainContent with path data when loaded", () => {
    const mockPathData = {
      id: 1,
      title: "Test Path",
      description: "A test bike path",
    };
    
    useParams.mockReturnValue({ slug: "test-path" });
    useGetBikePathsQuery.mockReturnValue({
      data: mockPathData,
      error: undefined,
      isLoading: false,
      isError: false,
    });

    render(<PathPage />);

    expect(MainContent).toHaveBeenCalledWith(
      { path: mockPathData, loading: false },
      undefined
    );
    expect(screen.getByText("Mocked MainContent")).toBeInTheDocument();
  });

  it("handles error state gracefully", () => {
    useParams.mockReturnValue({ slug: "test-path" });
    useGetBikePathsQuery.mockReturnValue({
      data: undefined,
      error: { message: "Failed to fetch" },
      isLoading: false,
      isError: true,
    });

    render(<PathPage />);

    expect(MainContent).toHaveBeenCalledWith(
      { path: undefined, loading: false },
      undefined
    );
  });

  it("decodes URL-encoded slug before querying", () => {
    useParams.mockReturnValue({ slug: "bike%20path%20name" });
    useGetBikePathsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });

    render(<PathPage />);

    expect(useGetBikePathsQuery).toHaveBeenCalledWith({
      title: "bike path name",
    });
  });

  it("handles special characters in slug", () => {
    useParams.mockReturnValue({ slug: "path%20with%20%26%20ampersand" });
    useGetBikePathsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });

    render(<PathPage />);

    expect(useGetBikePathsQuery).toHaveBeenCalledWith({
      title: "path with & ampersand",
    });
  });

  it("renders wrapping div container", () => {
    useParams.mockReturnValue({ slug: "test-path" });
    useGetBikePathsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });

    const { container } = render(<PathPage />);

    expect(container.firstChild.tagName).toBe("DIV");
  });
});