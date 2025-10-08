import validateGeminiResponse, {
  REQUIRED_KEYS,
} from "@/lib/utils/validation/validateGeminiResponse";

describe("Validates of Gemini Responses", () => {
  it("Throws an error message if response is invalid JSON", () => {
    let mockedData = "invalid json {hehe: invalid}";
    expect(() => validateGeminiResponse(mockedData)).toThrow("Gemini response is not valid JSON");
  });
});
