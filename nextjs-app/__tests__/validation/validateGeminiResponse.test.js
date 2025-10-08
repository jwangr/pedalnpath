import validateGeminiResponse, {
  REQUIRED_KEYS,
} from "@/lib/utils/validation/validateGeminiResponse";

describe("Validates of Gemini Responses", () => {
  it("parses and returns valid json - must include title, startCoordinate, endCoordinate, coordinates []", () => {
    let validData = JSON.stringify([
      {
        id: 1,
        title: "Title 1",
        startCoordinate: 0,
        endCoordinate: 0,
        coordinates: [0, 0],
      },
      {
        id: 2,
        title: "Title 2",
        startCoordinate: 0,
        endCoordinate: 0,
        coordinates: [0, 0],
      },
      {
        id: 3,
        title: "Title 3",
        startCoordinate: 0,
        endCoordinate: 0,
        coordinates: [0, 0],
      },
    ]);
    expect(validateGeminiResponse(validData)).toEqual(JSON.parse(validData));
  });

  it("throws an error message if response is invalid JSON", () => {
    let mockedData = "invalid json {hehe: invalid}";
    expect(() => validateGeminiResponse(mockedData)).toThrow(
      "Gemini response is not valid JSON"
    );
  });

  it("Throws an error if JSON objects is not in an array", () => {
    let validData = JSON.stringify({
      title: "Title 1",
      startCoordinate: 0,
      // endCoordinate: 0,
      coordinates: [0, 0],
    });
    expect(() => validateGeminiResponse(validData)).toThrow(
      "Gemini response should be an array"
    );
  });

  it("Throws an error if JSON objects doesn't include coordinates array", () => {
    let validData = JSON.stringify([
      {
        id: 1,
        title: "Title 1",
        startCoordinate: 0,
        endCoordinate: 0,
        // coordinates: [0, 0],
      },
      {
        id: 2,
        title: "Title 2",
        startCoordinate: 0,
        endCoordinate: 0,
        // coordinates: [0, 0],
      },
      {
        id: 3,
        title: "Title 3",
        startCoordinate: 0,
        endCoordinate: 0,
        // coordinates: [0, 0],
      },
    ]);
    expect(() => validateGeminiResponse(validData)).toThrow(
      `Missing key \"coordinates\" in Gemini response item`
    );
  });

  it("Throws an error if JSON objects doesn't include title", () => {
    let validData = JSON.stringify([
      {
        // title: "Title 1",
        startCoordinate: 0,
        endCoordinate: 0,
        coordinates: [0, 0],
      },
    ]);
    expect(() => validateGeminiResponse(validData)).toThrow(
      `Missing key \"title\" in Gemini response item`
    );
  });

  it("Throws an error if JSON objects doesn't include startCoordinate", () => {
    let validData = JSON.stringify([
      {
        title: "Title 1",
        // startCoordinate: 0,
        endCoordinate: 0,
        coordinates: [0, 0],
      },
    ]);
    expect(() => validateGeminiResponse(validData)).toThrow(
      `Missing key \"startCoordinate\" in Gemini response item`
    );
  });

  it("Throws an error if JSON objects doesn't include endCoordinate", () => {
    let validData = JSON.stringify([
      {
        title: "Title 1",
        startCoordinate: 0,
        // endCoordinate: 0,
        coordinates: [0, 0],
      },
    ]);
    expect(() => validateGeminiResponse(validData)).toThrow(
      `Missing key \"endCoordinate\" in Gemini response item`
    );
  });
});
