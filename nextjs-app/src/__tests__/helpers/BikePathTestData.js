// Test data factory for bike path related tests
// This file is a test helper, not a test suite
export class BikePathTestData {
  static samplePaths = [
    {
      id: 1,
      title: "Scenic River Trail",
      description: "A beautiful trail along the river with great views",
      difficulty: "Easy",
      distanceKm: 5.2,
      duration: "30 mins",
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 40.7589,
      endLng: -73.9851,
      suitableFor: ["Beginner", "Family"],
    },
    {
      id: 2,
      title: "Mountain Challenge",
      description: "Challenging mountain trail for experienced cyclists",
      difficulty: "Hard",
      distanceKm: 15.8,
      duration: "90 mins",
      startLat: 40.758,
      startLng: -73.9855,
      endLat: 40.7831,
      endLng: -73.9712,
      suitableFor: ["Advanced"],
    },
    {
      id: 3,
      title: "Urban Explorer",
      description: "City route through historic neighborhoods",
      difficulty: "Medium",
      distanceKm: 8.5,
      duration: "45 mins",
      startLat: 40.7505,
      startLng: -73.9934,
      endLat: 40.7614,
      endLng: -73.9776,
      suitableFor: ["Intermediate", "Tourist"],
    },
  ];

  static getSamplePath(index = 0) {
    return { ...this.samplePaths[index] };
  }

  static getAllSamplePaths() {
    return this.samplePaths.map((path) => ({ ...path }));
  }

  static getNewPathData() {
    return {
      title: "New Test Path",
      description: "A newly created test path",
      difficulty: "Medium",
      distanceKm: 7.3,
      duration: "40 mins",
      startCoordinate: [40.74, -74.0],
      endCoordinate: [40.76, -73.98],
      suitableFor: ["Intermediate"],
    };
  }

  static getInvalidPathData() {
    return {
      title: "", // Invalid - empty title
      description: "Invalid path data",
      // Missing required fields
    };
  }

  static createMockRequest(url, method = "GET", body = null) {
    const mockRequest = {
      url,
      method,
      json: jest.fn().mockResolvedValue(body),
    };
    return mockRequest;
  }

  static createMockDaoImplementation() {
    return {
      getAllPaths: jest.fn(),
      findPathByName: jest.fn(),
      createPath: jest.fn(),
      deletePath: jest.fn(),
    };
  }
}

// This ensures Jest doesn't try to run this file as a test
export default {};
