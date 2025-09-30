import GeminiDao from "@/lib/dao/GeminiDao";
import ValidationError from "./ValidationError";
const gemini = new GeminiDao();

export default class ValidateOSRMRequest {
  async validateLocation(text) {
    // Check that location is not empty or null
    if (!text || text?.length === 0 || typeof text !== "string") {
      throw new ValidationError("Received empty prompt.");
    }

    // Checkt that location is in NZ
    const NZLocation = await gemini.checkinNZ(text);
    const parsed = JSON.parse(NZLocation);
    if (!parsed.validLocation) {
      throw new ValidationError(`${text} does not seem to be in New Zealand.`);
    }
    return text;
  }
}
