import validateGeminiResponse from "@/lib/utils/validation/validateGeminiResponse";
import { mockGeminiDao } from "../dao/mockGeminiDao";
import ValidatePrompt from "@/lib/utils/validation/ValidateGeminiPrompt";

jest.mock("../../src/lib/utils/validation/ValidateGeminiPrompt.js", () => {
  const mockValidateText = jest.fn(); // define mock function as jest.mock() functions are called first

  return jest.fn().mockImplementation(() => ({
    validateText: mockValidateText,
  }));
});

jest.mock("../../src/lib/utils/validation/validateGeminiResponse.js");

// Import controller AFTER mocked functions are set up
import ExploreController from "@/lib/controllers/ExplorerController";
import ValidatePrompt from "@/lib/utils/validation/ValidateGeminiPrompt";
import { mockGeminiDao } from "../dao/mockGeminiDao";

describe("Explorer / Gemini controller", () => {
  let controller;
  let validatePromptInstance;
  let mockValidateText;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    controller = new ExploreController(mockGeminiDao);
    validatePromptInstance = new ValidatePrompt();
    mockValidateText = validatePromptInstance.validateText;
  });

  it("should validate input, send request to DAO and parse response", async () => {
    const location = "Queenstown";
    const daoResponse = { result: "raw data" };
    const parsedResponse = { result: "parsed data" };

    // Setup mocks
    mockValidateText.mockResolvedValue(); // resolves successfully
    mockGeminiDao.sendRequest.mockResolvedValue(daoResponse);
    validateGeminiResponse.mockReturnValue(parsedResponse);

    const result = await controller.sendToGemini(location);

    // Assertions
    expect(mockValidateText).toHaveBeenCalledWith(location);
    expect(mockGeminiDao.sendRequest).toHaveBeenCalledWith(location);
    expect(validateGeminiResponse).toHaveBeenCalledWith(daoResponse);
    expect(result).toEqual(parsedResponse);
  });
});
