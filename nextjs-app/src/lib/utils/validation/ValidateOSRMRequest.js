import GeminiDao from "@/lib/dao/GeminiDao";
import ValidationError from "./ValidationError";

export default class ValidateOSRMRequest {
  constructor() {
    this.gemini = new GeminiDao();
  }
  async validateLocation(text) {
    // Check that location is not empty or null
    if (!text || text?.length === 0) {
      throw new ValidationError("Received empty prompt.");
    }

    // Check that location is in NZ
    const NZLocation = await this.gemini.checkinNZ(text);
    const parsed = JSON.parse(NZLocation);
    if (!parsed.validLocation) {
      throw new ValidationError(`${text} does not seem to be in New Zealand.`);
    }
    return text;
  }
}
