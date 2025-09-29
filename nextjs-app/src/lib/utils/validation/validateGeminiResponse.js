export const REQUIRED_KEYS = [
  "title",
  "startCoordinate",
  "endCoordinate",
  "coordinates",
];

export default function validateGeminiResponse(data) {
  let parsed;

  try {
    parsed = JSON.parse(data);
  } catch (err) {
    throw new Error("Gemini response is not valid JSON");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Gemini response should be an array");
  }

  for (const item of parsed) {
    for (const key of REQUIRED_KEYS) {
      if (!(key in item)) {
        throw new Error(`Missing key "${key}" in Gemini response item`);
      }
    }
  }

  return parsed; // Return parsed JSON if valid
}
