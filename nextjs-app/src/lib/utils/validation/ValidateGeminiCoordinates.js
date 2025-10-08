export default function validateGeminiCoordinates(coordinates) {
  // checks coordinates is a series of coordinates
  if (coordinates.length <= 1) {
    throw new Error(
      "Only start point noted. No destination provided by Gemini."
    );
  }

  return null; // return nothing if valid coordinates
}