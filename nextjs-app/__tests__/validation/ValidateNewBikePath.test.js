import ValidationError from "@/lib/utils/validation/ValidationError";
import ValidateNewBikePath from "@/lib/utils/validation/ValidateNewBikePath";

describe("validates new bike paths before adding to database", () => {
  let validator;
  beforeEach(() => {
    validator = new ValidateNewBikePath();
  });
  it("returns the bikepath as a restructured object", () => {
    const mockPath = {
      title: "mock",
      distanceKm: 1,
      startCoordinate: [0, 0],
      endCoordinate: [0, 0],
      coordinates: [
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      description: "mock description",
      difficulty: "mock difficulty",
      duration: "mock duration",
      notes: "mock notes",
      trackType: "mock trackType",
      highlights: ["A", "B", "C"],
      suitableFor: ["A", "B", "C"],
    };

    expect(validator.validatePath(mockPath)).toEqual({
      title: "mock",
      distanceKm: 1,
      startLat: 0,
      startLng: 0,
      endLat: 0,
      endLng: 0,
      coordinates: [
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      description: "mock description",
      difficulty: "mock difficulty",
      duration: "mock duration",
      notes: "mock notes",
      trackType: "mock trackType",
      highlights: ["A", "B", "C"],
      suitableFor: ["A", "B", "C"],
    });
  });
  it("throws an error if invalid title", () => {
    const mockPathNumber = {
      title: 123,
    };

    const mockPathEmpty = {
      id: 1,
    };

    expect(() => validator.validatePath(mockPathNumber)).toThrow(
      ValidationError
    );
    expect(() => validator.validatePath(mockPathNumber)).toThrow(
      "Path must have a valid title"
    );
    expect(() => validator.validatePath(mockPathEmpty)).toThrow(
      ValidationError
    );
    expect(() => validator.validatePath(mockPathEmpty)).toThrow(
      "Path must have a valid title"
    );
  });
  it("throws an error if no start or end coordinates of array type", () => {
    const invalidCases = [
      { title: "test", distanceKm: 1 }, // missing both
      { title: "test", distanceKm: 1, startCoordinate: "not-array" }, // invalid start
      { title: "test", distanceKm: 1, endCoordinate: null }, // invalid end
      {
        title: "test",
        distanceKm: 1,
        startCoordinate: [0, 0],
        endCoordinate: "not-array",
      }, // invalid end
    ];

    for (const mockPath of invalidCases) {
      expect(() => validator.validatePath(mockPath)).toThrow(ValidationError);
      expect(() => validator.validatePath(mockPath)).toThrow(
        "Path must have a valid "
      );
    }
  });
  it("throws an error if coordinates array is too short or non-existant", () => {
    const invalidCases = [
      {
        title: "mock",
        distanceKm: 2,
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
        coordinates: [[0, 0]],
      },
      {
        title: "mock",
        distanceKm: 2,
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
        coordinates: ["apple, banana, cheery"],
      },
      {
        title: "mock",
        distanceKm: 2,
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
      },
    ];

    for (const mockPath of invalidCases) {
      expect(() => validator.validatePath(mockPath)).toThrow(ValidationError);
      expect(() => validator.validatePath(mockPath)).toThrow(
        "Path must include coordinates array with at least 2 points"
      );
    }
  });
  it("throws an error if distance property is invalid", () => {
    const invalidCases = [
      {
        title: "mock",
        distanceKm: -2,
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
        coordinates: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      },
      {
        title: "mock",
        distanceKm: "inv",
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
        coordinates: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      },
      {
        title: "mock",
        startCoordinate: [0, 0],
        endCoordinate: [0, 0],
        coordinates: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      },
    ];

    for (const mockPath of invalidCases) {
      expect(() => validator.validatePath(mockPath)).toThrow(ValidationError);
      expect(() => validator.validatePath(mockPath)).toThrow(
        "Distance must be a decimal number"
      );
    }
  });
});
