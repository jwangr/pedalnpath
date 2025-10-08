import GeminiDao from "@/lib/dao/GeminiDao";
import ValidateOSRMRequest from "@/lib/utils/validation/ValidateOSRMRequest";
import ValidationError from "@/lib/utils/validation/ValidationError";

jest.mock("../../src/lib/dao/GeminiDao.js"); // mock the Gemini dao to fabricate it's functions

describe("validates OSRM prompts", () => {
  let mockCheckinNZ; // mocked test
  let validator;

  beforeEach(() => {
    mockCheckinNZ = jest.fn();
    GeminiDao.mockImplementation(() => ({
      checkinNZ: mockCheckinNZ,
    }));
    validator = new ValidateOSRMRequest();
  });

  it("returns valid location", async () => {
    mockCheckinNZ.mockResolvedValue(
      JSON.stringify({
        validLocation: true,
      })
    );
    const result = await validator.validateLocation("Queenstown");
    expect(mockCheckinNZ).toHaveBeenCalledTimes(1);
    expect(mockCheckinNZ).toHaveBeenCalledWith("Queenstown");
    expect(result).toEqual("Queenstown");
  });

  it("throws a validation error if the location is empty or null", async () => {
    await expect(validator.validateLocation("")).rejects.toThrow(
      ValidationError
    );
    await expect(validator.validateLocation(null)).rejects.toThrow(
      "Received empty prompt"
    );
  });

  it("throws a validation error if location is not in NZ", async () => {
    mockCheckinNZ.mockResolvedValue(
      JSON.stringify({
        validLocation: false,
      })
    );
    await expect(validator.validateLocation("Sydney")).rejects.toThrow(
      ValidationError
    );
    await expect(validator.validateLocation("Sydney")).rejects.toThrow(
      "Sydney does not seem to be in New Zealand"
    );
  });
});
