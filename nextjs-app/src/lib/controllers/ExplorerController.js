import GeminiDao from "../dao/GeminiDao";
import ValidatePrompt from "../utils/validation/ValidateGeminiPrompt";
import validateGeminiResponse from "../utils/validation/validateGeminiResponse";

const validate = new ValidatePrompt();

export default class ExploreController {
  constructor(dao = new GeminiDao()) {
    this.dao = dao;
  }

  async sendToGemini(location) {
    await validate.validateText(location); // validates the prompt length and location
    const data = await this.dao.sendRequest(location);
    const parsed = validateGeminiResponse(data);
    return parsed;
  }
}
