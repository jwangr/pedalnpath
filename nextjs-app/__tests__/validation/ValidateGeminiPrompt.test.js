import ValidatePrompt from "@/lib/utils/validation/ValidateGeminiPrompt";
import ValidationError from "@/lib/utils/validation/ValidationError";

describe("validates Gemini prompts", () => {
  let validator;
  beforeEach(() => {
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
});
