// helper for validation

import GeminiDao from "@/lib/dao/GeminiDao";
import ValidationError from "./ValidationError";

export default class ValidatePrompt {
  constructor() {
    this.gemini = new GeminiDao();
  }
  async validateText(location) {
    const length = location?.length || 0; // if null text, will return 0

    // Throw error if prompt is null or blank
    if (length === 0) {
      throw new ValidationError(
        "Received empty prompt. Please type in a prompt."
      );
    }

    // Throw error if prompt is too long
    if (length > 500) {
      throw new ValidationError(
        `Prompt is too long (${length} characters). Maximum limit: 500 characters`
      );
    }

    const NZLocation = await this.gemini.checkinNZ(location);
    const parsed = JSON.parse(NZLocation);
    console.log(parsed["validLocation"]);
    if (!parsed.validLocation) {
      throw new ValidationError(`Prompt does not seem to be in New Zealand.`);
    }
  }
}
