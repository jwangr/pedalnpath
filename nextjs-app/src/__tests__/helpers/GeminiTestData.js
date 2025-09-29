// Test data factory for Gemini API route tests
// This file is a test helper, not a test suite

export class GeminiTestData {
  // Sample locations for testing
  static sampleLocations = [
    "Queenstown",
    "Auckland",
    "Christchurch",
  ];

  // Returns one of the sample locations
  static getSampleLocation(index = 0) {
    return this.sampleLocations[index];
  }

  // Returns valid POST body for /api/gemini
  static getNewGeminiData() {
    return {
      value: "Queenstown", // matches expected req.body.value
    };
  }

  // Returns intentionally invalid POST body for error handling
  static getInvalidGeminiData() {
    return {
      invalidField: true, // missing required 'value'
    };
  }

  // Example of what the DAO might return as a response string
  static getMockGeminiResponse() {
    return JSON.stringify([
      {
        title: "Queenstown Trail - Lake Wakatipu Ride",
        description:
          "A scenic ride along the shores of Lake Wakatipu, offering stunning views of the Remarkables mountain range.",
        difficulty: "Easy",
        distanceKm: 35,
        duration: "2-4 hours",
        startCoordinate: [-45.0312, 168.6626],
        endCoordinate: [-45.0312, 168.6626],
        coordinates: [
          [-45.0312, 168.6626],
          [-45.05, 168.68],
          [-45.07, 168.65],
        ],
        highlights: ["Lake views", "Easy ride"],
        notes: "Family friendly",
        trackType: "Cycleway",
        suitableFor: ["Beginner", "Family"],
      },
    ]);
  }

  // Helper to mock Request object for Next.js Route Handlers
  static createMockRequest(url, method = "POST", body = null) {
    return {
      url,
      method,
      json: jest.fn().mockResolvedValue(body),
    };
  }

  // Mock DAO methods for unit testing the controller
  static createMockDaoImplementation() {
    return {
      sendRequest: jest.fn().mockResolvedValue(this.getMockGeminiResponse()),
    };
  }
}

// Ensure Jest doesn't try to run this file as a test
export default {};
