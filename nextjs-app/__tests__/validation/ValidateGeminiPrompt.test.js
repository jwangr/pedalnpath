import GeminiDao from "@/lib/dao/GeminiDao";
import ValidatePrompt from "@/lib/utils/validation/ValidateGeminiPrompt";
import ValidationError from "@/lib/utils/validation/ValidationError";

// mocks entire Gemini Dao class
jest.mock("../../src/lib/dao/GeminiDao.js");

describe("validates Gemini prompts", () => {
  let validator;
  let mockCheckinNZ;

  beforeEach(() => {
    mockCheckinNZ = jest.fn(); // mock fn can be controlled: e.g. with mockResolvedValue, or toHaveBeenCalledWith
    GeminiDao.mockImplementation(() => ({
      checkinNZ: mockCheckinNZ,
    })); // when someone calls new GeminiDao() (e.g. when validator is constructed), return this object { checkinNZ: mockCheckinNZ }

    validator = new ValidatePrompt();
  });
  it("throws an error when location is empty", async () => {
    expect(() => validator.validateText("")).rejects.toThrow(ValidationError);
    expect(() => validator.validateText("")).rejects.toThrow(
      "Received empty prompt. Please type in a prompt."
    );
  });
  it("throws an error when location is null", async () => {
    expect(() => validator.validateText(null)).rejects.toThrow(ValidationError);
    expect(() => validator.validateText(null)).rejects.toThrow(
      "Received empty prompt. Please type in a prompt."
    );
  });
  it("throws an error when location exceeds 500 characters", async () => {
    const longLocation = "a".repeat(501);
    expect(() => validator.validateText(longLocation)).rejects.toThrow(
      ValidationError
    );
    expect(() => validator.validateText(longLocation)).rejects.toThrow(
      "Prompt is too long (501 characters). Maximum limit: 500 characters"
    );
  });
  it("checks if location is in NZ", async () => {
    mockCheckinNZ.mockResolvedValue(
      JSON.stringify({
        validLocation: true,
      })
    );
    // This will call mockCheckinNZ while processing
    await validator.validateText("Queenstown");

    // Verify mockCheckinNZ was called properly
    expect(mockCheckinNZ).toHaveBeenCalledTimes(1);
    expect(mockCheckinNZ).toHaveBeenCalledWith("Queenstown");
  });
  it("throws an error if location is not in NZ", async () => {
    mockCheckinNZ.mockResolvedValue(
      JSON.stringify({
        validLocation: false,
      })
    );

    expect(validator.validateText("Sydney")).rejects.toThrow(ValidationError);
    expect(validator.validateText("Sydney")).rejects.toThrow(
      "Prompt does not seem to be in New Zealand"
    );
  });
});
