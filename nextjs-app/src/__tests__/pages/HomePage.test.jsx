import { render, screen } from "@testing-library/react";
import HomePage from "@/app/home/page";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

// Mock with relative paths
jest.mock("../../lib/auth", () => ({
  getSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../../components/HeaderBanner", () => {
  return jest.fn(({ h1, h4, subtitle1 }) => (
    <div data-testid="header-banner">
      <h1>{h1}</h1>
      <h4>{h4}</h4>
      <p>{subtitle1}</p>
    </div>
  ));
});

jest.mock("../../components/PathsContainer", () => {
  return jest.fn(({ displayPaths, userId }) => (
    <div data-testid="paths-container">
      PathsContainer: {displayPaths} - User: {userId}
    </div>
  ));
});


jest.mock("../../components/reviews/ReviewsGallery", () => {
  return jest.fn(() => (
    <div data-testid="reviews-gallery">Reviews Gallery</div>
  ));
});

// Mock console.log to keep test output clean
const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe("when user is authenticated", () => {
    const mockUser = {
      id: "user-123",
      email: "test@example.com",
    };

    beforeEach(() => {
      getSession.mockResolvedValue(mockUser);
    });

    it("renders the homepage with user-specific content", async () => {
      const component = await HomePage();
      render(component);

      expect(screen.getByTestId("header-banner")).toBeInTheDocument();
      expect(
        screen.getByText("FIND YOUR NEXT PEDAL-VENTURE")
      ).toBeInTheDocument();
      expect(screen.getByText("Welcome, test@example.com")).toBeInTheDocument();
      expect(
        screen.getByText("Explore our list of bike paths")
      ).toBeInTheDocument();
    });

    it("displays the reviews gallery", async () => {
      const component = await HomePage();
      render(component);

      expect(screen.getByTestId("reviews-gallery")).toBeInTheDocument();
    });

    it("displays the Discover More section", async () => {
      const component = await HomePage();
      render(component);

      expect(screen.getByText("Discover More")).toBeInTheDocument();
    });

    it("renders AllPathsContainer with correct props", async () => {
      const component = await HomePage();
      render(component);

      expect(screen.getByTestId("paths-container")).toBeInTheDocument();
      expect(screen.getByText(/PathsContainer: AllPaths/)).toBeInTheDocument();
      expect(screen.getByText(/User: user-123/)).toBeInTheDocument();
    });

    it("logs the user email to console", async () => {
      await HomePage();

      expect(console.log).toHaveBeenCalledWith(
        "Loading homepage for test@example.com"
      );
    });

    it("does not redirect when user is authenticated", async () => {
      await HomePage();

      expect(redirect).not.toHaveBeenCalled();
    });

    it("handles user with no email gracefully", async () => {
      getSession.mockResolvedValue({ id: "user-456", email: null });

      const component = await HomePage();
      render(component);

      expect(screen.getByText("Welcome, anon")).toBeInTheDocument();
      expect(console.log).toHaveBeenCalledWith("Loading homepage for anon");
    });
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      getSession.mockResolvedValue(null);
    });

    it("redirects to login page", async () => {
      // redirect throws in Next.js, so we need to catch it
      redirect.mockImplementation(() => {
        throw new Error("NEXT_REDIRECT");
      });

      await expect(HomePage()).rejects.toThrow("NEXT_REDIRECT");
      expect(redirect).toHaveBeenCalledWith("/login");
    });

    it("logs anonymous user to console", async () => {
      redirect.mockImplementation(() => {
        throw new Error("NEXT_REDIRECT");
      });

      try {
        await HomePage();
      } catch (e) {
        // Expected to throw
      }

      expect(console.log).toHaveBeenCalledWith("Loading homepage for anon");
    });
  });
});
