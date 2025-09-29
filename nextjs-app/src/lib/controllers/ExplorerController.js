import GeminiDao from "../dao/GeminiDao";
import ValidatePrompt from "../utils/validation/ValidateGeminiPrompt";
import validateGeminiResponse from "../utils/validation/validateGeminiResponse";

const gemini = new GeminiDao();
const validate = new ValidatePrompt();

export default class ExploreController {
  async sendToGemini(location) {
    await validate.validateText(location); // validates the prompt length and location
    const data = await gemini.sendRequest(location);
    const parsed = validateGeminiResponse(data);
    return parsed;
  }
}
