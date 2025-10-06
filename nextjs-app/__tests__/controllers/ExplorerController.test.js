import ExploreController from "@/lib/controllers/ExplorerController";
import ValidatePrompt from "@/lib/utils/validation/ValidateGeminiPrompt";
import validateGeminiResponse from "@/lib/utils/validation/validateGeminiResponse";
import { mockGeminiDao } from "../dao/mockGeminiDao";

// mock the validation class
jest.mock("../../src/lib/utils/validation/ValidateGeminiPrompt.js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      validateText: jest.fn(),
    };
  });
});

jest.mock("../../src/lib/utils/validation/ValidateGeminiResponse.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Explorer / Gemini controller", () => {
  let controller;
  let mockValidatorInstance;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    controller = new ExploreController(mockGeminiDao);
    mockValidatorInstance = new ValidatePrompt();
  });

  it("should validate input, send request to DAO and parse response", async () => {
    const location = "Queenstown";
    const daoResponse = { result: "raw data" };
    const parsedResponse = { result: "parsed data" };

    // Setup mocks
    mockValidatorInstance.validateText.mockResolvedValue(); // resolves successfully
    mockGeminiDao.sendRequest.mockResolvedValue(daoResponse);
    // validateGeminiResponse.mockReturnValue(parsedResponse);

    const result = await controller.sendToGemini(location);

    // Assertions
    expect(validateMock.validateText).toHaveBeenCalledWith(location);
    expect(daoMock.sendRequest).toHaveBeenCalledWith(location);
    // expect(validateGeminiResponse).toHaveBeenCalledWith(daoResponse);
    expect(result).toEqual(parsedResponse);
  });
});
