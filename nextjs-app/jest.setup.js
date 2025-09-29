import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";

// Mock environment variables
process.env.DATABASE_URL = "file:./test.db";

// Polyfill TextEncoder and TextDecoder for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ----------------------------
// BikePathDao Mock
// ----------------------------
jest.mock("./src/lib/dao/BikePathDao", () => {
  return jest.fn().mockImplementation(() => ({
    getAllPaths: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: "Test Path 1",
        description: "First test path",
        difficulty: "Easy",
        distanceKm: 5.0,
        duration: "30 mins",
        startLat: 40.7128,
        startLng: -74.006,
        endLat: 40.7589,
        endLng: -73.9851,
      },
      {
        id: 2,
        title: "Test Path 2",
        description: "Second test path",
        difficulty: "Medium",
        distanceKm: 8.5,
        duration: "45 mins",
        startLat: 40.758,
        startLng: -73.9855,
        endLat: 40.7831,
        endLng: -73.9712,
      },
    ]),
    findPathByName: jest.fn().mockImplementation((title) => {
      if (title === "Test Path 1") {
        return Promise.resolve({
          id: 1,
          title: "Test Path 1",
          description: "First test path",
          difficulty: "Easy",
        });
      }
      return Promise.resolve(null);
    }),
    createPath: jest.fn().mockResolvedValue({
      id: 3,
      title: "New Path",
      description: "Newly created path",
      success: true,
    }),
    deletePath: jest.fn().mockResolvedValue({
      success: true,
      deletedId: 1,
    }),
  }));

  
});

// ----------------------------
// GeminiDao Mock
// ----------------------------
import GeminiTestData from "@/__tests__/helpers/GeminiTestData";

jest.mock("./src/lib/dao/GeminiDao", () => {
  return jest.fn().mockImplementation(() => ({
    sendRequest: jest
      .fn()
      .mockImplementation((location) =>
        Promise.resolve(GeminiTestData.getMockGeminiResponse())
      ),
  }));
});